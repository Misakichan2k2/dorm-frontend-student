<script setup>
import { ref, onMounted } from "vue";
import {
  addMonths,
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { STORE_ROOM_INFO } from "@/services/stores";

const { onActionGetMyRenewals, onActionCreateRenewal, onActionCreateVnpayUrl } =
  STORE_ROOM_INFO.StoreRoomInfo();

const renewalData = ref([]);
const student = ref(null);
const showDialog = ref(false);

const nextRenewalMonth = ref("");
const nextStartDate = ref("");
const nextEndDate = ref("");

const snackbar = ref(false);
const snackbarMessage = ref("");
const snackbarColor = ref("success");

// Headers định nghĩa cho bảng
const headers = [
  { title: "STT", key: "index", sortable: false, align: "center" },
  { title: "Tháng gia hạn", value: "month", align: "center" },
  { title: "Trạng thái", value: "status", align: "center" },
  { title: "Ghi chú", value: "notes", align: "center", maxWidth: "12rem" },
  { title: "Hành động", value: "action", align: "center" },
];

const fetchRenewalRequests = async () => {
  await onActionGetMyRenewals().then((res) => {
    renewalData.value = res?.data?.data || [];
    student.value = res?.data?.student;
  });
};

const formatStatus = (status) => {
  switch (status) {
    case "unpaid":
      return "Chưa thanh toán";
    case "pending":
      return "Chờ duyệt";
    case "approved":
      return "Đã duyệt";
    case "rejected":
      return "Bị từ chối";
    case "refunded":
      return "Đã hoàn tiền";
    default:
      return "-";
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "unpaid":
      return "orange";
    case "pending":
      return "blue";
    case "approved":
      return "green";
    case "rejected":
      return "red";
    case "refunded":
      return "purple";
    default:
      return "grey";
  }
};

function prepareRenewal() {
  let current;

  if (renewalData.value.length > 0 && renewalData.value[0]?.endDate) {
    current = parseISO(renewalData.value[0].endDate);
  } else if (student.value?.endDate) {
    current = parseISO(student.value.endDate);
  } else {
    console.warn("Không có endDate để tính gia hạn");
    return;
  }

  const nextMonthDate = addMonths(current, 1);
  nextRenewalMonth.value = format(nextMonthDate, "MM/yyyy");
  nextStartDate.value = format(startOfMonth(nextMonthDate), "yyyy-MM-dd");
  nextEndDate.value = format(endOfMonth(nextMonthDate), "yyyy-MM-dd");

  showDialog.value = true;
}

const confirmRenewal = async () => {
  await onActionCreateRenewal(student.value._id);
  showDialog.value = false;
  await fetchRenewalRequests(); // reload danh sách

  // Hiển thị snackbar
  snackbarMessage.value = "Gửi yêu cầu gia hạn thành công!";
  snackbarColor.value = "success";
  snackbar.value = true;
};

const handlePayment = async (item) => {
  await onActionCreateVnpayUrl(item._id).then((res) => {
    window.location.href = res.data?.paymentUrl;
  });
};

onMounted(fetchRenewalRequests);
</script>

<template>
  <v-container class="pa-0">
    <v-btn
      prepend-icon="mdi-arrow-left"
      variant="outlined"
      color="primary"
      class="mb-4"
      to="/room-info"
    >
      Quay lại
    </v-btn>

    <v-card class="mb-4">
      <v-card-title
        class="text-center text-h5 font-weight-bold text-blue-darken-3"
      >
        Gia hạn thuê Phòng
        {{ student?.registration?.room?.room }} - Khu
        {{ student?.registration?.room?.building?.name }}
      </v-card-title>
      <v-card-subtitle class="text-center text-body-2 text-blue-grey-darken-1">
        Danh sách các tháng đã và cần gia hạn, trạng thái, ghi chú và thanh toán
      </v-card-subtitle>
    </v-card>

    <v-card>
      <v-card-text>
        <v-btn
          color="primary"
          prepend-icon="mdi-plus-circle-outline"
          @click="prepareRenewal"
        >
          Yêu cầu gia hạn thuê
        </v-btn>

        <v-divider class="my-4" />

        <v-data-table
          :headers="headers"
          :items="renewalData"
          class="elevation-1"
        >
          <template #item.index="{ index }">
            {{ index + 1 }}
          </template>
          <template #item.month="{ item }">
            {{ String(item.month).padStart(2, "0") }} / {{ item.year }}
          </template>
          <template #item.status="{ item }">
            <v-chip :color="getStatusColor(item.status)" dark>
              {{ formatStatus(item.status) }}
            </v-chip>
          </template>

          <template #item.notes="{ item }">
            {{ item.notes || "-" }}
          </template>
          <template #item.action="{ item }">
            <v-btn
              :disabled="item.status !== 'unpaid'"
              size="small"
              elevation="0"
              color="primary"
              @click="handlePayment(item)"
            >
              Thanh toán
            </v-btn>
          </template>

          <template v-slot:no-data>
            <div class="pa-7">
              <i class="mdi mdi-file-remove text-h2 text-grey-lighten-1"></i>
              <p
                class="text-center text-muted font-italic text-subtitle-1 text-grey-lighten-1"
              >
                Bạn chưa có yêu cầu gia hạn thuê phòng nào!
              </p>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <v-dialog v-model="showDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Gia hạn thuê phòng</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          Bạn muốn gia hạn thuê phòng cho:<br /><br />
          <strong>Tháng:</strong> {{ nextRenewalMonth }}<br />
          <strong>Tiền thuê:</strong>
          {{
            student?.registration?.room?.price?.toLocaleString("vi-VN") || "-"
          }}
          VNĐ
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="showDialog = false">Hủy</v-btn>
          <v-btn color="primary" @click="confirmRenewal">Xác nhận</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>

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
.v-chip {
  font-size: 12px;
  margin: 0 !important;
  padding: 2px 8px !important;
}
</style>
