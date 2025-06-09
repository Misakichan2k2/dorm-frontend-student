<script setup>
import { ref, computed, onMounted } from "vue";
import { format } from "date-fns";
import { STORE_REGISTRATION } from "@/services/stores";

const props = defineProps({
  step1Data: {
    type: Object,
  },
});

const data = ref({});

const { onActionGetRooms } = STORE_REGISTRATION.StoreRegistration();

const search = ref("");
const selectedGender = ref("Tất cả");
const selectedBuilding = ref("Tất cả");
const availableSeats = ref("");

const headers = [
  { align: "center", key: "no", sortable: true, title: "STT" },
  { align: "center", key: "building.name", title: "Khu nhà" },
  { align: "center", key: "room", title: "Số phòng" },
  { align: "center", key: "gender", title: "Giới tính" },
  { align: "center", key: "price", title: "Giá (VNĐ)" },
  { align: "center", key: "building.peoplePerRoom", title: "Định mức đăng ký" },
  { align: "center", key: "total", title: "Số lượng đã đăng ký" },
  { align: "center", key: "empty", title: "Còn trống" },
  { align: "center", key: "action", sortable: false },
];

const roomTable = ref([]);

const dialog = ref(false);
const selectedItem = ref(null);
const selectedRoom = ref(null);
const selectedMoveIn = ref(null);
const showMonthError = ref(false);

function formatPrice(value) {
  return value.toLocaleString("vi-VN");
}

const formatDate = (date) => {
  if (!date || isNaN(new Date(date))) return "Không xác định";
  return format(new Date(date), "MM/yyyy");
};

const now = new Date();

const thisMonth = now.getMonth() + 1;
const thisYear = now.getFullYear();

const allowedOptions = [];

for (let i = 0; i < 2; i++) {
  const month = thisMonth + i;
  const displayMonth = month > 12 ? month - 12 : month;
  const displayYear = month > 12 ? thisYear + 1 : thisYear;

  allowedOptions.push({
    label: `Tháng ${String(displayMonth).padStart(2, "0")}/${displayYear}`,
    value: `${displayYear}-${String(displayMonth).padStart(2, "0")}`,
  });
}

// Bấm nút "Chọn"
const selectRoom = (room) => {
  selectedRoom.value = room;
  selectedMoveIn.value = null; // reset chọn tháng
};

// Bấm nút "Xác nhận đăng ký" (sau khi chọn tháng)
const confirmSelection = () => {
  if (!selectedMoveIn.value) {
    showMonthError.value = true;
    return;
  }
  showMonthError.value = false;
  selectedItem.value = selectedRoom.value;
  dialog.value = true;
};

const confirmRegister = () => {
  const id = selectedItem.value._id;

  if (!selectedMoveIn.value) {
    console.warn("Chưa chọn thời gian thuê");
    return;
  }

  const [year, month] = selectedMoveIn.value.split("-");

  console.log("ID đã chọn:", id);
  console.log("Month đã chọn:", month);
  console.log("Year đã chọn:", year);

  data.value = {
    roomId: id,
    month: Number(month),
    year: Number(year),
  };

  dialog.value = false;
};

const buildingOptions = computed(() => [
  "Tất cả",
  ...[...new Set(roomTable.value.map((r) => r.building.name))].sort((a, b) =>
    a.localeCompare(b)
  ),
]);

const genderOptions = ["Tất cả", "Nam", "Nữ"];

// Lọc danh sách theo điều kiện
const filteredRooms = computed(() => {
  return roomTable.value
    .map((room) => ({
      ...room,
    }))
    .filter((room) => {
      return (
        (selectedGender.value === "Tất cả" ||
          room.gender === selectedGender.value) &&
        (selectedBuilding.value === "Tất cả" ||
          room?.building?.name
            .toLowerCase()
            .includes(selectedBuilding.value.toLowerCase())) &&
        (search.value === "" || room.room.toString().includes(search.value)) &&
        (availableSeats.value === "" ||
          room.empty.toString() === availableSeats.value)
      );
    });
});

// Làm mới bộ lọc
const resetFilters = () => {
  search.value = "";
  selectedGender.value = "Tất cả";
  selectedBuilding.value = "Tất cả";
  availableSeats.value = "";
};

onMounted(async () => {
  await onActionGetRooms().then((res) => {
    roomTable.value = res.data;
  });
});

defineExpose({ data });
</script>

<template>
  <v-container>
    <div class="text-center pb-5 font-weight-bold text-h6">
      <span class="text-blue-darken-3">Kỳ hạn thuê phòng: </span>
      <span class="text-grey-darken-3">1 tháng</span>
    </div>
    <!-- Filter Section -->
    <v-card class="pa-4">
      <v-row dense>
        <v-col cols="12" md="3">
          <span>Tìm theo số phòng:</span>
          <v-text-field
            v-model="search"
            placeholder="Số phòng"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="compact"
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <span>Lọc theo giới tính:</span>
          <v-select
            v-model="selectedGender"
            :items="genderOptions"
            variant="outlined"
            density="compact"
            hide-details
          ></v-select>
        </v-col>

        <v-col cols="12" md="3">
          <span>Lọc theo khu nhà:</span>
          <v-combobox
            v-model="selectedBuilding"
            :items="buildingOptions"
            variant="outlined"
            density="compact"
            hide-details
          ></v-combobox>
        </v-col>

        <v-col cols="12" md="3">
          <span>Lọc theo số chỗ trống:</span>
          <v-text-field
            v-model="availableSeats"
            placeholder="Chỗ trống"
            prepend-inner-icon="mdi-filter-outline"
            variant="outlined"
            density="compact"
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>

      <v-btn
        color="secondary"
        prepend-icon="mdi-filter-off-outline"
        variant="outlined"
        @click="resetFilters"
        class="mt-3"
      >
        Làm mới
      </v-btn>
    </v-card>

    <!-- Room Table -->
    <v-card class="mt-4" elevation="2">
      <v-data-table
        :headers="headers"
        :items="filteredRooms"
        item-value="room"
        class="elevation-1"
      >
        <template v-slot:item.no="data">
          {{ data.index + 1 }}
        </template>

        <template v-slot:item.building.name="{ item }"
          >Khu {{ item.building.name }}
        </template>

        <template v-slot:item.gender="{ item }">
          <v-chip
            :color="item.gender === 'Nam' ? 'blue' : 'pink'"
            elevation="0"
          >
            {{ item.gender }}
          </v-chip>
        </template>

        <template v-slot:item.price="{ item }"
          >{{ formatPrice(item.price) }}
        </template>

        <template v-slot:item.empty="{ item }">
          <v-chip
            :color="
              item.empty === 0 ? 'red' : item.empty < 3 ? 'orange' : 'green'
            "
            elevation="0"
          >
            {{ item.empty }} chỗ
          </v-chip>
        </template>

        <template v-slot:item.action="{ item }">
          <v-btn
            color="primary"
            size="small"
            :disabled="item.empty === 0 || step1Data.gender !== item.gender"
            @click="selectRoom(item)"
          >
            Chọn
          </v-btn>
        </template>

        <template v-slot:no-data>
          <div class="pa-7">
            <i class="mdi mdi-home-off text-h2 text-grey-lighten-1"></i>
            <p class="text-grey-darken-1 text-subtitle-1 font-italic">
              Không có phòng nào phù hợp với kết quả tìm kiếm!
            </p>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <!-- UI chọn tháng năm chỉ hiện khi đã chọn phòng -->
    <div v-if="selectedRoom" style="margin-top: 20px">
      <v-card class="pa-5 mt-3" style="border-left: 5px solid #0066cc">
        <div class="mb-4">
          <strong>Phòng đã chọn:</strong> {{ selectedRoom.room }} -
          {{ selectedRoom.building?.name }}
        </div>
        <strong>Vui lòng chọn thời gian thuê:</strong>
        <v-select
          v-model="selectedMoveIn"
          :items="allowedOptions"
          placeholder="Chọn tháng năm vào ở"
          item-title="label"
          item-value="value"
          dense
          variant="outlined"
          :error="showMonthError"
          :error-messages="
            showMonthError ? ['Vui lòng chọn tháng năm vào ở'] : []
          "
        ></v-select>
        <v-btn color="blue-darken-3" class="mt-1" @click="confirmSelection"
          >Xác nhận đăng ký</v-btn
        >
      </v-card>
    </div>

    <div class="pt-5">
      <span class="font-weight-bold text-red">Lưu ý:</span>
      <ul class="text-red pl-5">
        <li>
          Mỗi sinh viên chỉ được đăng ký một phòng tại một thời điểm. Nếu đã có
          đơn đăng ký chưa thanh toán hoặc đang chờ duyệt, bạn không thể tạo đơn
          mới.
        </li>
        <li>
          Theo quy định, sinh viên chỉ được đăng ký ở ký túc xá trong thời gian
          1 tháng ban đầu. Nếu có nhu cầu tiếp tục ở, bạn cần thực hiện gia hạn
          trước khi kết thúc tháng đầu tiên.
        </li>
      </ul>
    </div>
  </v-container>

  <!-- Dialog xác nhận -->
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="text-h6">Xác nhận đăng ký</v-card-title>
      <v-card-text>
        {{
          `Bạn có chắc chắn muốn đăng ký phòng ${selectedItem?.room} - Khu ${
            selectedItem?.building?.name
          } vào tháng ${formatDate(selectedMoveIn)}?`
        }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" color="error" @click="dialog = false">Hủy</v-btn>
        <v-btn variant="tonal" color="teal-lighten-1" @click="confirmRegister">
          Xác nhận
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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

.v-data-table th {
  background-color: #009688;
  color: white;
}

.v-data-table td {
  text-align: center;
}
</style>
