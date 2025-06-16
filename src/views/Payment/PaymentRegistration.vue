<script setup>
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const success = route.query.success === "true";

const goRoom = () => {
  router.push("/room-info");
};
</script>

<style scoped>
.text-center {
  max-width: 500px;
}
</style>

<template>
  <v-container
    class="d-flex align-center justify-center"
    style="padding-top: 7rem"
  >
    <v-card class="pa-10">
      <div class="text-center w-100" style="max-width: 500px">
        <v-icon :color="success ? 'success' : 'error'" size="80" class="mb-4">
          {{
            success ? "mdi-check-circle-outline" : "mdi-alert-circle-outline"
          }}
        </v-icon>

        <h1 class="text-h5 font-weight-medium mb-2">
          {{ success ? "Thanh toán thành công" : "Thanh toán thất bại" }}
        </h1>

        <p class="text-body-1 text-grey-darken-1 mb-4">
          {{
            success
              ? "Cảm ơn bạn! Chúng tôi đã nhận được thanh toán. Một bản sao hóa đơn đã được gửi tới email của bạn."
              : "Thanh toán không thành công. Vui lòng thử lại hoặc liên hệ quản trị viên để được hỗ trợ."
          }}
        </p>

        <v-divider class="my-6"></v-divider>

        <div class="d-flex justify-center ga-4">
          <v-btn
            color="primary"
            :variant="success ? 'elevated' : 'outlined'"
            @click="goRoom"
          >
            {{ success ? "Đơn đăng ký" : "Thử lại" }}
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-container>
</template>
