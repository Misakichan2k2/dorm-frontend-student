<script setup>
import { ref, computed, onMounted } from "vue";
import { format } from "date-fns";
import { STORE_REPORT } from "@/services/stores";

const { onActionCreateReport, onActionGetMyRoomReport, onActionCancelReport } =
  STORE_REPORT.StoreReport();

const searchQuery = ref("");
const reports = ref([]);

const newReportDialog = ref(false);
const reportDetailDialog = ref(false);
const selectedReport = ref(null);
const activeMenuId = ref(null);

const reportTitle = ref("");
const reportDescription = ref("");
const reportCategory = ref(null);
const reportImage = ref(null);
const snackbar = ref(false);
const snackbarMessage = ref("");
const snackbarColor = ref("success");

const formatDate = (date) => {
  if (!date) return "-";
  return format(new Date(date), "dd/MM/yyyy");
};

const rules = {
  required: (v) => !!v || "Trường này là bắt buộc",
};

const isFormValid = computed(() => {
  return (
    reportTitle.value &&
    reportDescription.value &&
    reportCategory.value &&
    reportImage.value
  );
});

const statusColor = (status) => {
  switch (status) {
    case "Đã xử lý":
      return "green";
    case "Chờ xử lý":
      return "orange";
    case "Đang xử lý":
      return "blue";
    default:
      return "grey";
  }
};

const openReportDetail = (report) => {
  selectedReport.value = report;
  reportDetailDialog.value = true;
};

const resetFilters = () => {
  searchQuery.value = "";
};

const filteredReports = computed(() => {
  if (!searchQuery.value) return reports.value;
  return reports.value.filter((report) =>
    report.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const fetchReports = async () => {
  await onActionGetMyRoomReport().then((res) => {
    console.log(res?.data);
    reports.value = res?.data;
  });
};

const cancelReport = (reportId) => {
  onActionCancelReport(reportId)
    .then(() => {
      reports.value = reports.value.filter((report) => report._id !== reportId);
      activeMenuId.value = null;

      snackbarMessage.value = "Hủy báo cáo thành công";
      snackbarColor.value = "success";
      snackbar.value = true;

      return fetchReports();
    })
    .catch(() => {
      snackbarMessage.value = "Hủy báo cáo thất bại";
      snackbarColor.value = "error";
      snackbar.value = true;
    });
};

const submitForm = () => {
  if (!isFormValid.value) return;

  const formData = new FormData();
  formData.append("title", reportTitle.value);
  formData.append("description", reportDescription.value);
  formData.append("category", reportCategory.value);
  if (reportImage.value) {
    formData.append("image", reportImage.value);
  }

  onActionCreateReport(formData)
    .then(() => {
      newReportDialog.value = false;
      reportTitle.value = "";
      reportDescription.value = "";
      reportCategory.value = null;
      reportImage.value = null;

      snackbarMessage.value = "Tạo báo cáo thành công";
      snackbarColor.value = "success";
      snackbar.value = true;

      return fetchReports();
    })
    .catch((error) => {
      console.error("Lỗi tạo báo cáo:", error);
      snackbarMessage.value = "Đã xảy ra lỗi khi tạo báo cáo";
      snackbarColor.value = "error";
      snackbar.value = true;
    });
};

onMounted(async () => {
  await fetchReports();
});
</script>

<template>
  <v-container class="pa-0">
    <!-- Header Section -->
    <v-row class="mb-4">
      <v-col cols="12" class="text-center">
        <v-card class="pa-4" elevation="2">
          <div class="text-h5 font-weight-bold text-blue-darken-3">
            Danh sách báo cáo sự cố
          </div>
          <div class="text-body-2 text-blue-grey-darken-1">
            Báo cáo sự cố phòng ở để ban quản lý xử lý nhanh nhất có thể
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Filter section -->
    <v-card class="pa-4" elevation="2">
      <v-row class="d-flex align-center justify-space-between">
        <v-col cols="auto">
          <v-btn
            color="primary"
            prepend-icon="mdi mdi-plus-circle-outline"
            elevation="0"
            @click="newReportDialog = true"
          >
            Tạo báo cáo
          </v-btn>
        </v-col>

        <v-col cols="12" md="9" class="d-flex justify-end ga-2 align-center">
          <v-btn
            color="secondary"
            elevation="0"
            prepend-icon="mdi mdi-filter-off-outline"
            variant="outlined"
            @click="resetFilters"
          >
            Làm mới
          </v-btn>
          <v-text-field
            v-model="searchQuery"
            placeholder="Tìm kiếm tiêu đề sự cố"
            density="compact"
            variant="outlined"
            prepend-inner-icon="mdi-magnify"
            hide-details
            clearable
            style="max-width: 42%"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>

    <!-- Table -->
    <v-card class="mt-4" elevation="2">
      <div v-if="reports.length === 0" class="text-center pa-16">
        <i class="mdi mdi-book-clock text-h2 text-grey-lighten-1"></i>
        <p
          class="text-center text-muted font-italic text-subtitle-1 text-red-lighten-1"
        >
          Chưa có báo cáo được tạo!
        </p>
      </div>

      <v-data-table v-else :items="filteredReports" item-value="id">
        <template v-slot:headers>
          <tr>
            <th>STT</th>
            <th>Tiêu đề sự cố</th>
            <th>Danh mục sự cố</th>
            <th class="text-center">Thời gian báo</th>
            <th class="text-center">Thời gian hoàn thành</th>
            <th class="text-center">Trạng thái</th>
            <th class="text-center">Hành động</th>
          </tr>
        </template>
        <template v-slot:item="{ item, index }">
          <tr>
            <td>{{ index + 1 }}</td>
            <td>
              <span
                class="text-blue-darken-4 text-decoration-underline cursor-pointer"
                @click="openReportDetail(item)"
              >
                {{ item.title }}
              </span>
            </td>
            <td>{{ item.category }}</td>
            <td class="text-center">{{ formatDate(item.createdAt) }}</td>
            <td class="text-center">{{ formatDate(item.completedAt) }}</td>
            <td class="text-center">
              <v-chip :color="statusColor(item.status)" dark>
                {{ item.status }}
              </v-chip>
            </td>
            <td class="text-center">
              <v-menu
                v-if="item.status === 'Chờ xử lý'"
                :close-on-content-click="false"
                location="bottom"
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="red-darken-2"
                    size="small"
                    elevation="0"
                    variant="outlined"
                    v-bind="props"
                    @click="activeMenuId = item._id"
                  >
                    Hủy đơn
                  </v-btn>
                </template>

                <v-card
                  v-if="activeMenuId === item._id"
                  min-width="300"
                  class="pa-2"
                >
                  <v-card-text
                    class="text-center text-body-1 font-weight-medium"
                  >
                    Bạn có muốn hủy đơn báo cáo không?
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions class="justify-end">
                    <v-btn variant="text" @click="activeMenuId = null"
                      >Không</v-btn
                    >
                    <v-btn
                      color="error"
                      variant="text"
                      @click="cancelReport(item._id)"
                    >
                      Xác nhận
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>

  <!-- Dialog Thêm Mới -->
  <v-dialog v-model="newReportDialog" max-width="600">
    <v-card class="pa-6">
      <div class="text-h5 text-center font-weight-bold mb-4 text-uppercase">
        Tạo báo cáo sự cố
      </div>

      <span>Tiêu đề sự cố <span class="text-red-darken-3">*</span></span>
      <v-text-field
        v-model="reportTitle"
        placeholder="Tiêu đề sự cố"
        variant="outlined"
        density="compact"
        :rules="[rules.required]"
      ></v-text-field>

      <span>Mô tả sự cố <span class="text-red-darken-3">*</span></span>
      <v-textarea
        v-model="reportDescription"
        placeholder="Mô tả sự cố"
        variant="outlined"
        density="compact"
        :rules="[rules.required]"
      ></v-textarea>

      <span>Danh mục sự cố <span class="text-red-darken-3">*</span></span>
      <v-select
        v-model="reportCategory"
        :items="['Hỏng thiết bị', 'Sự cố điện', 'Sự cố nước', 'Khác']"
        placeholder="Danh mục sự cố"
        variant="outlined"
        density="compact"
        :rules="[rules.required]"
      ></v-select>

      <span>Ảnh minh chứng <span class="text-red-darken-3">*</span></span>
      <v-file-upload
        v-model="reportImage"
        clearable
        title="Kéo thả tập tin vào đây"
        divider-text="hoặc"
        browse-text="Chọn tệp"
        density="default"
        variant="comfortable"
        accept="image/*"
      ></v-file-upload>
      <div class="d-flex justify-space-between mt-4">
        <v-btn color="grey" variant="outlined" @click="newReportDialog = false"
          >Hủy</v-btn
        >
        <v-btn color="primary" :disabled="!isFormValid" @click="submitForm"
          >Gửi báo cáo</v-btn
        >
      </div>
    </v-card>
  </v-dialog>

  <!-- Dialog Chi Tiết -->
  <v-dialog v-model="reportDetailDialog" max-width="700">
    <v-card class="pa-6">
      <!-- Tiêu đề -->
      <div class="text-h6 text-center font-weight-bold mb-2 text-uppercase">
        📝 Chi tiết báo cáo: #{{ selectedReport?.reportId }}
      </div>
      <v-divider class="mb-4"></v-divider>

      <!-- Trạng thái -->
      <div class="text-center mb-4">
        <v-chip
          :color="statusColor(selectedReport.status)"
          dark
          size="large"
          class="ma-auto"
          prepend-icon="mdi-alert-circle"
        >
          {{ selectedReport?.status }}
        </v-chip>
      </div>

      <!-- Thông tin chi tiết -->
      <v-row dense>
        <v-col cols="12">
          <span class="font-weight-medium">Tiêu đề sự cố:</span>
          <v-text-field
            variant="outlined"
            :model-value="selectedReport?.title"
            readonly
            density="compact"
          />
        </v-col>
      </v-row>

      <v-row dense>
        <v-col cols="12">
          <span class="font-weight-medium">Mô tả sự cố:</span>
          <v-textarea
            variant="outlined"
            :model-value="selectedReport?.description"
            readonly
            auto-grow
            density="compact"
          />
        </v-col>
      </v-row>

      <v-row dense>
        <v-col cols="12">
          <span class="font-weight-medium">Danh mục sự cố:</span>
          <v-text-field
            variant="outlined"
            :model-value="selectedReport?.category"
            readonly
            density="compact"
          />
        </v-col>
      </v-row>

      <!-- Ảnh minh chứng -->
      <v-row dense>
        <v-col cols="12">
          <span class="font-weight-medium">Ảnh minh chứng:</span>
          <div class="mb-2">
            <v-img
              :src="selectedReport?.image || '/public/images/feedback.jpeg'"
              contain
              class="w-100 rounded border"
            />
          </div>
        </v-col>
      </v-row>

      <!-- Thời gian -->
      <v-row dense>
        <v-col cols="6">
          <span class="font-weight-medium">Thời gian báo:</span>
          <v-text-field
            variant="outlined"
            :model-value="formatDate(selectedReport?.createdAt)"
            readonly
            density="compact"
          />
        </v-col>
        <v-col cols="6">
          <span class="font-weight-medium">Thời gian hoàn thành:</span>
          <v-text-field
            variant="outlined"
            :model-value="formatDate(selectedReport?.completedAt)"
            readonly
            density="compact"
          />
        </v-col>
      </v-row>

      <!-- Nút Đóng -->
      <div class="d-flex justify-end mt-4">
        <v-btn
          color="secondary"
          elevation="0"
          variant="outlined"
          @click="reportDetailDialog = false"
        >
          Đóng
        </v-btn>
      </div>
    </v-card>
  </v-dialog>

  <!-- Snackbar -->
  <v-snackbar
    v-model="snackbar"
    :color="snackbarColor"
    timeout="3000"
    location="top right"
  >
    {{ snackbarMessage }}
  </v-snackbar>
</template>

<style scoped>
.text-h5 {
  font-weight: bold;
  color: #4a4a4a;
}

.text-body-2 {
  color: #6a6a6a;
}

.v-chip {
  font-size: 12px;
}

::v-deep(.v-file-upload) {
  padding: 10px !important;
}

::v-deep(.v-file-upload-divider) {
  margin: 1rem;
}
</style>
