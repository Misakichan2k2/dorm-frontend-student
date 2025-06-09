<script setup>
import { ref, computed } from "vue";
import {
  addMonths,
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
} from "date-fns";

const building = "A";
const room = "101";
const currentEndDate = "2025-06-30"; // Ngày kết thúc hiện tại của kỳ thuê cuối cùng

const renewalData = ref([
  {
    month: "07/2025",
    startDate: "01/07/2025",
    endDate: "31/07/2025",
    paidAt: "02/07/2025",
    status: "Đã duyệt",
    note: "",
  },
  {
    month: "08/2025",
    startDate: "01/08/2025",
    endDate: "31/08/2025",
    paidAt: null,
    status: null,
    note: null,
  },
]);

const showDialog = ref(false);
const nextRenewalMonth = ref("");
const nextStartDate = ref("");
const nextEndDate = ref("");
const rentPrice = 1200000; // Tiền thuê cố định, có thể lấy từ room.price nếu có

function prepareRenewal() {
  const current = parseISO(currentEndDate);
  const nextMonthDate = addMonths(current, 1);
  nextRenewalMonth.value = format(nextMonthDate, "MM/yyyy");
  nextStartDate.value = format(startOfMonth(nextMonthDate), "dd/MM/yyyy");
  nextEndDate.value = format(endOfMonth(nextMonthDate), "dd/MM/yyyy");
  showDialog.value = true;
}

function confirmRenewal() {
  renewalData.value.push({
    month: nextRenewalMonth.value,
    startDate: nextStartDate.value,
    endDate: nextEndDate.value,
    paidAt: null,
    status: null,
    note: null,
  });
  showDialog.value = false;
}

function handlePayment(rowIndex) {
  const now = new Date();
  renewalData.value[rowIndex].paidAt = format(now, "dd/MM/yyyy");
  renewalData.value[rowIndex].status = "Đang chờ duyệt";
  renewalData.value[rowIndex].note = "";
}
</script>

<template>
  <v-container>
    <v-row class="mb-4">
      <v-col cols="12">
        <v-card class="pa-4" elevation="2">
          <div class="text-center text-h5 font-weight-bold text-blue-darken-3">
            Gia hạn thuê Khu {{ building }} - Phòng {{ room }}
          </div>
          <div class="text-center text-body-2 text-blue-grey-darken-1">
            Danh sách các tháng đã và cần gia hạn, trạng thái, ghi chú và thanh
            toán
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-card>
      <v-col class="">
        <v-btn
          color="primary"
          elevation="0"
          prepend-icon="mdi mdi-plus-circle-outline"
          @click="prepareRenewal"
          >Yêu cầu gia hạn thuê</v-btn
        >
      </v-col>
      <v-card-text>
        <v-table>
          <thead>
            <tr>
              <th class="text-center">Tháng</th>
              <th class="text-center">Bắt đầu</th>
              <th class="text-center">Kết thúc</th>
              <th class="text-center">Ngày thanh toán</th>
              <th class="text-center">Trạng thái</th>
              <th>Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in renewalData" :key="index">
              <td>{{ item.month }}</td>
              <td>{{ item.startDate }}</td>
              <td>{{ item.endDate }}</td>
              <td>
                <v-btn
                  v-if="!item.paidAt"
                  color="primary"
                  elevation="0"
                  @click="handlePayment(index)"
                >
                  Thanh toán
                </v-btn>
                <span v-else>{{ item.paidAt }}</span>
              </td>
              <td>{{ item.status || "-" }}</td>
              <td>{{ item.note || "-" }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>

    <!-- Dialog xác nhận gia hạn -->
    <v-dialog v-model="showDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Gia hạn thuê phòng</v-card-title>
        <hr />
        <v-card-text>
          Bạn muốn gia hạn thuê phòng cho:<br /><br />
          <strong>Tháng:</strong> {{ nextRenewalMonth }}<br />
          <strong>Tiền thuê:</strong>
          {{ rentPrice.toLocaleString("vi-VN") }} VNĐ
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="showDialog = false">Hủy</v-btn>
          <v-btn color="primary" @click="confirmRenewal">Xác nhận</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
th,
td {
  text-align: center;
}
</style>
