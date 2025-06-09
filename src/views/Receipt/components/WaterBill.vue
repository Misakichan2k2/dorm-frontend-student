<script setup>
import { ref, computed, onMounted } from "vue";
import { format } from "date-fns";
import { STORE_INVOICE } from "@/services/stores";

const { onActionGetMyWaterInvoice, onActionCreateWaterPaymentURrl } =
  STORE_INVOICE.StoreInvoice();

// Cấu trúc bảng
const headers = [
  { title: "STT", key: "index", sortable: true },
  { title: "Tháng/Năm", key: "month", sortable: true },
  { title: "Khu", key: "room.building.name", sortable: true },
  { title: "Phòng", key: "room.room", sortable: true },
  { title: "Chỉ số cũ", key: "oldIndex", sortable: true },
  { title: "Chỉ số mới", key: "newIndex", sortable: true },
  { title: "Tổng tiêu thụ", key: "totalConsumption", sortable: true },
  { title: "Đơn giá 1M³ (VNĐ)", key: "unitPrice", sortable: true },
  { title: "Thành tiền (VNĐ)", key: "totalAmount", sortable: true },
  { title: "Hạn đóng", key: "dueDate", sortable: true },
  { title: "Trạng thái", key: "status", sortable: true },
  { title: "Thanh toán", key: "action", sortable: false },
];

// Danh sách hóa đơn mẫu
const invoices = ref([]);

const formatDate = (date) => {
  return format(new Date(date), "dd/MM/yyyy");
};

// Danh sách filter
const selectedMonth = ref("Tất cả");
const selectedYear = ref("Tất cả");
const selectedStatus = ref("Tất cả");

// Lựa chọn tháng, năm, trạng thái
const monthOptions = ["Tất cả", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const yearOptions = ["Tất cả", 2023, 2024, 2025];
const statusOptions = ["Tất cả", "Đã đóng", "Chưa đóng"];

// Reset bộ lọc
const resetFilters = () => {
  selectedMonth.value = "Tất cả";
  selectedYear.value = "Tất cả";
  selectedStatus.value = "Tất cả";
};

const computedInvoices = computed(() => {
  return invoices.value.map((invoice) => ({
    ...invoice,
    totalConsumption: invoice.newIndex - invoice.oldIndex,
  }));
});

// Lọc dữ liệu theo bộ lọc
const filteredInvoices = computed(() => {
  return computedInvoices.value.filter((invoice) => {
    return (
      (selectedMonth.value === "" ||
        selectedMonth.value === "Tất cả" ||
        invoice.month === selectedMonth.value) &&
      (selectedYear.value === "" ||
        selectedYear.value === "Tất cả" ||
        invoice.year === selectedYear.value) &&
      (selectedStatus.value === "" ||
        selectedStatus.value === "Tất cả" ||
        invoice.status === selectedStatus.value)
    );
  });
});

const handlePay = async (item) => {
  console.log("waterId đã chọn:", item);
  await onActionCreateWaterPaymentURrl({
    waterId: item?._id,
  }).then((res) => {
    window.location.href = res.data?.paymentUrl;
  });
};

onMounted(async () => {
  await onActionGetMyWaterInvoice().then((res) => {
    console.log(res?.data);

    invoices.value = res?.data;
  });
});
</script>

<template>
  <v-card flat class="pa-4">
    <div class="text-center text-h5 font-weight-bold mb-4 text-blue-darken-3">
      Danh sách hóa đơn điện
    </div>

    <v-row>
      <v-col cols="12" md="4">
        <span>Lọc theo Tháng:</span>
        <v-select
          v-model="selectedMonth"
          :items="monthOptions"
          placeholder="Tháng"
          density="compact"
          variant="outlined"
        ></v-select>
      </v-col>

      <v-col cols="12" md="4">
        <span>Lọc theo Năm:</span>
        <v-select
          v-model="selectedYear"
          :items="yearOptions"
          placeholder="Năm"
          density="compact"
          variant="outlined"
        ></v-select>
      </v-col>

      <v-col cols="12" md="4">
        <span>Lọc theo Trạng thái thanh toán:</span>
        <v-select
          v-model="selectedStatus"
          :items="statusOptions"
          placeholder="Trạng thái"
          variant="outlined"
          density="compact"
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="d-flex justify-start" style="margin-top: -2.2rem">
        <v-btn
          color="secondary"
          class="mb-5"
          elevation="0"
          variant="outlined"
          prepend-icon="mdi mdi-filter-off-outline"
          @click="resetFilters"
        >
          Làm mới
        </v-btn>
      </v-col>
    </v-row>
  </v-card>

  <v-data-table :headers="headers" :items="filteredInvoices" item-value="id">
    <template #item.index="{ index }">
      {{ index + 1 }}
    </template>

    <template v-slot:item.month="{ item }">
      {{ item.month }}/{{ item.year }}
    </template>

    <template v-slot:item.totalConsumption="{ item }">
      {{ item.newIndex - item.oldIndex }}
    </template>

    <template v-slot:item.totalAmount="{ item }">
      {{
        (item.unitPrice * (item.newIndex - item.oldIndex)).toLocaleString(
          "vi-VN"
        )
      }}
    </template>

    <template v-slot:item.dueDate="{ item }">
      {{ formatDate(item.dueDate) }}
    </template>

    <template v-slot:item.status="{ item }">
      <v-chip :color="item.status === 'Đã đóng' ? 'green' : 'red'">{{
        item.status
      }}</v-chip></template
    >

    <template v-slot:item.action="{ item }">
      <v-btn
        :disabled="item.status === 'Đã đóng'"
        color="primary"
        class="text-white"
        elevation="0"
        size="small"
        style="letter-spacing: -0.5px"
        @click="handlePay(item)"
      >
        Thanh toán
      </v-btn>
    </template>

    <template v-slot:no-data>
      <div class="pa-7">
        <i class="mdi mdi-book-clock text-h2 text-grey-lighten-1"></i>
        <p
          class="text-center text-muted font-italic text-subtitle-1 text-red-lighten-1"
        >
          Chưa có hóa đơn điện!
        </p>
      </div>
    </template>
  </v-data-table>
</template>

<style scoped>
.v-chip {
  font-size: 12px;
}
</style>
