<script setup>
import { ref, onMounted } from "vue";
import { format } from "date-fns";
import { STORE_ROOM_INFO } from "@/services/stores";

const { onActionGetMyRoomRequest, onActionCreateVnpayUrlRegistration } =
  STORE_ROOM_INFO.StoreRoomInfo();

const registrations = ref([]);

const formatDate = (date) => {
  if (!date || isNaN(new Date(date))) return "Không xác định";
  return format(new Date(date), "dd/MM/yyyy");
};

const formatDateTime = (date) => {
  if (!date || isNaN(new Date(date))) return "Không xác định";
  return format(new Date(date), "dd/MM/yyyy HH:mm");
};

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    price
  );
const getStatusColor = (status) => {
  switch (status) {
    case "approved":
      return "green";
    case "pending":
      return "blue";
    case "unpaid":
      return "orange";
    case "rejected":
      return "red";
    case "refunded":
      return "yellow";
    default:
      return "grey";
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case "approved":
      return "Đã xác nhận";
    case "pending":
      return "Chờ xác nhận";
    case "unpaid":
      return "Chưa thanh toán";
    case "rejected":
      return "Từ chối";
    case "refunded":
      return "Hoàn tiền";
    case "canceled":
      return "Bị hủy";
    default:
      return "Không xác định";
  }
};

const handlePayment = async (registration) => {
  try {
    const res = await onActionCreateVnpayUrlRegistration({
      registrationId: registration._id,
    });

    const paymentUrl = res.data?.paymentUrl;
    if (paymentUrl) {
      window.location.href = res.data?.paymentUrl;
    } else {
      console.error("Không nhận được URL thanh toán từ server");
    }
  } catch (error) {
    console.error("Lỗi khi gọi API tạo URL thanh toán:", error);
  }
};

onMounted(async () => {
  await onActionGetMyRoomRequest().then((res) => {
    console.log(res?.data?.registrations);

    registrations.value = res?.data?.registrations;
  });
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col v-if="registrations?.length === 0" cols="12">
        <div class="text-center pa-16 d-flex flex-column ga-5">
          <i class="mdi mdi-book-clock text-h2 text-grey-lighten-1"></i>
          <p
            class="text-center text-muted font-italic text-subtitle-1 text-red-lighten-1"
          >
            Chưa có đơn đăng ký phòng nào!
          </p>
        </div>
      </v-col>

      <v-col
        v-for="registration in registrations"
        :key="registration.id"
        cols="12"
      >
        <v-card class="mb-3">
          <v-card-title style="font-weight: 600">
            Đơn đăng ký phòng #{{ registration.registrationCode }}: Phòng
            {{ registration.room.room }} - Khu
            {{ registration.room.building.name }}
          </v-card-title>
          <v-card-subtitle>
            <span style="font-weight: 600">Thời gian sử dụng:</span>
            {{ formatDate(registration.startDate) }} -
            {{ formatDate(registration.endDate) }} |
            <span style="font-weight: 600">Giá:</span>
            {{ formatPrice(registration.room.price) }} |
            <span style="font-weight: 600">Thời gian đăng ký:</span>
            {{ formatDateTime(registration.createdAt) }}
          </v-card-subtitle>

          <v-card-text>
            <v-chip
              :color="getStatusColor(registration.status)"
              style="font-weight: 600"
            >
              {{ getStatusLabel(registration.status) }}
            </v-chip>
          </v-card-text>

          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title
                class="font-weight-bold text-grey-darken-2"
              >
                Chi tiết đơn đăng ký
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <template v-if="registration.status === 'unpaid'">
                  <div
                    class="d-flex mb-5 ga-5 align-center justify-space-between"
                  >
                    <span style="font-size: 1rem">{{
                      registration.registerFormDetail
                    }}</span>
                    <v-btn
                      color="blue-darken-2"
                      @click="handlePayment(registration)"
                    >
                      Thanh toán ngay
                    </v-btn>
                  </div>
                </template>
                <template v-else>
                  <div>
                    <span style="font-size: 1rem">{{
                      registration.registerFormDetail || "Không có ghi chú."
                    }}</span>
                  </div>
                </template>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
