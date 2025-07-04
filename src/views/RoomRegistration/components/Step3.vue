<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { STORE_REGISTRATION } from "@/services/stores";

const { onActionCreateVnpayUrl } = STORE_REGISTRATION.StoreRegistration();

const props = defineProps({
  paymentInfo: {
    type: Object,
  },
});

const router = useRouter();
const agreed = ref(false);

const handlePayment = async () => {
  await onActionCreateVnpayUrl({
    registrationId: props?.paymentInfo?._id,
  }).then((res) => {
    window.location.href = res.data?.paymentUrl;
  });
};

const handlePayLater = () => {
  router.push("/room-info");
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
};
</script>

<template>
  <v-container class="py-6">
    <v-card-title class="text-h5 font-weight-bold text-center mb-4"
      >Xác nhận thanh toán</v-card-title
    >

    <div class="d-flex justify-center">
      <v-table dense class="mb-6" style="width: 30rem">
        <tbody>
          <tr>
            <td><strong>Khu:</strong></td>
            <td>{{ paymentInfo?.room?.building?.name || "Đang tải..." }}</td>
          </tr>
          <tr>
            <td><strong>Phòng:</strong></td>
            <td>{{ paymentInfo?.room?.room || "Đang tải..." }}</td>
          </tr>
          <tr>
            <td><strong>Giới tính:</strong></td>
            <td>{{ paymentInfo?.room?.gender || "Đang tải..." }}</td>
          </tr>
          <tr>
            <td><strong>Số tiền phải thanh toán:</strong></td>
            <td>
              <strong class="text-red">{{
                formatCurrency(paymentInfo?.room?.price || 0)
              }}</strong>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>

    <v-alert
      type="warning"
      variant="tonal"
      class="mb-6"
      border="start"
      prominent
    >
      <ul class="ma-0 pa-0 pl-4 text-body-2">
        <li>
          Sinh viên thanh toán trong vòng <strong>24 giờ</strong> kể từ thời
          điểm đăng ký. Sau 24h, đơn đăng ký sẽ tự hủy bởi hệ thống.
        </li>
        <li>
          Sinh viên chỉ nộp đúng số tiền như thông báo. Trong trường hợp thừa
          hoặc thiếu, Đại học và Trung tâm không chịu trách nhiệm cho việc đăng
          ký chỗ ở sinh viên.
        </li>
        <li>
          Sinh viên kiểm tra kỹ các thông tin trước khi thanh toán. Sau khi
          thanh toán, sinh viên không được đổi phòng.
        </li>
        <li>
          Mức thu theo tháng bất kể đăng ký phòng đầu tháng hay cuối tháng.
        </li>
        <li>
          Nếu cần hỗ trợ, sinh viên vui lòng gọi điện thoại theo số
          <strong>012 345 6789</strong> (giờ hành chính).
        </li>
      </ul>
    </v-alert>

    <v-checkbox
      v-model="agreed"
      label="Tôi đã đọc kỹ và đồng ý với các điều khoản trên."
      class="mb-4"
    ></v-checkbox>

    <div
      class="d-flex flex-column align-center justify-center"
      style="max-width: 480px; width: 100%; margin: auto"
    >
      <v-btn
        :disabled="!agreed"
        color="blue-darken-2"
        size="large"
        block
        class="mb-3"
        elevation="2"
        @click="handlePayment"
      >
        <v-icon start>mdi-credit-card-outline</v-icon>
        Thanh toán bằng VNPAY
      </v-btn>

      <div class="text-caption text-grey mb-3" style="font-weight: 500">
        — hoặc —
      </div>

      <v-btn
        color="grey-lighten-3"
        size="large"
        block
        elevation="1"
        @click="handlePayLater"
      >
        <v-icon start>mdi-clock-outline</v-icon>
        Thanh toán sau
      </v-btn>
    </div>
  </v-container>
</template>
