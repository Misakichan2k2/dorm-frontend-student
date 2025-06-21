<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { STORE_AUTH } from "@/services/stores";
import { VCard, VCardText, VCardTitle, VIcon, VBtn } from "vuetify/components";

const { onActionVerifyEmail } = STORE_AUTH.StoreAuth();

const route = useRoute();
const router = useRouter();
const status = ref("Đang xác thực...");
const isSuccess = ref(false);
const isError = ref(false);

onMounted(async () => {
  const token = route.query.token;
  if (!token) {
    status.value = "Không tìm thấy token xác thực.";
    isError.value = true;
    return;
  }

  try {
    const res = await onActionVerifyEmail(token);
    status.value = res.data.message;
    isSuccess.value = true;
  } catch (err) {
    status.value = err.response?.data?.message || "Đã xảy ra lỗi.";
    isError.value = true;
  }
});
</script>

<template>
  <div class="d-flex justify-center align-center" style="min-height: 100vh">
    <v-card class="pa-6" max-width="500" elevation="4">
      <v-card-title class="text-h5 font-weight-bold text-center">
        Xác thực Email
      </v-card-title>
      <v-card-text class="text-center">
        <v-icon
          :color="isSuccess ? 'success' : isError ? 'error' : 'primary'"
          size="48"
          class="mb-4"
        >
          {{
            isSuccess
              ? "mdi-check-circle"
              : isError
              ? "mdi-alert-circle"
              : "mdi-loading"
          }}
        </v-icon>
        <div class="text-subtitle-1 mb-4">
          {{ status }}
        </div>
        <v-btn v-if="isSuccess" color="primary" to="/sign-in" variant="flat">
          Đăng nhập
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>
