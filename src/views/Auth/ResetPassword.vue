<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { STORE_AUTH } from "@/services/stores";

const { onActionResetPassword } = STORE_AUTH.StoreAuth();

const route = useRoute();
const router = useRouter();
const token = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const loading = ref(false);
const dialog = ref(false);
const message = ref("");
const confirmTouched = ref(false);

const handleReset = async () => {
  if (!token.value || newPassword.value !== confirmPassword.value) {
    return;
  }

  loading.value = true;
  try {
    const res = await onActionResetPassword({
      token: token.value,
      newPassword: newPassword.value,
    });

    message.value = res.data.message || "Đặt lại mật khẩu thành công!";
    dialog.value = true;
  } catch (err) {
    console.error(err.response?.data?.message || err.message);
  } finally {
    loading.value = false;
  }
};

const goToLogin = () => {
  dialog.value = false;
  router.push({ name: "SignIn" });
};

onMounted(() => {
  token.value = route.query.token || "";
});
</script>

<template>
  <div style="min-height: 100vh" class="d-flex justify-center">
    <v-img src="/public/images/background-3.jpg" cover height="100vh">
      <div style="padding-top: 6rem">
        <v-container
          class="text-center"
          style="position: relative; max-width: 490px"
        >
          <!-- Biểu tượng chìa khóa tròn -->
          <div
            style="
              position: absolute;
              top: 8px;
              left: 50%;
              transform: translateX(-50%);
              width: 80px;
              height: 80px;
              background-color: #3f51b5;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
              z-index: 99999;
            "
          >
            <v-icon color="white" size="36">mdi-key-variant</v-icon>
          </div>

          <v-card
            class="pa-6 pt-10 rounded-lg"
            elevation="5"
            style="margin-top: 40px"
          >
            <v-card-title class="text-h5 text-center font-weight-bold"
              >Đặt lại mật khẩu
            </v-card-title>

            <v-card-subtitle
              >Vui lòng nhập mật khẩu mới và xác nhận lại để hoàn
              tất.</v-card-subtitle
            >

            <v-form @submit.prevent="handleReset">
              <v-text-field
                v-model="newPassword"
                type="password"
                placeholder="Mật khẩu mới"
                variant="outlined"
                class="mt-5"
              />
              <v-text-field
                v-model="confirmPassword"
                type="password"
                placeholder="Xác nhận mật khẩu"
                variant="outlined"
                class="mb-5 text-start"
                :rules="[
                  (v) => !!v || 'Vui lòng xác nhận mật khẩu',
                  (v) => v === newPassword || 'Mật khẩu xác nhận không khớp',
                ]"
              />
              <v-btn
                :loading="loading"
                block
                size="large"
                color="primary"
                elevation="0"
                type="submit"
                :disabled="!newPassword || newPassword !== confirmPassword"
              >
                Xác nhận
              </v-btn>
            </v-form>
          </v-card>
        </v-container>
      </div>
    </v-img>
  </div>

  <!-- Dialog đặt lại mật khẩu thành công -->
  <v-dialog v-model="dialog" persistent max-width="420">
    <v-card class="pa-4">
      <v-card-title class="text-h6 font-weight-bold text-center justify-center">
        <v-icon color="success" size="36" class="mr-2"
          >mdi-check-circle-outline</v-icon
        >
        Đặt lại mật khẩu thành công
      </v-card-title>

      <v-card-text class="text-center">
        {{ message }}
        <br />
        Bạn có thể đăng nhập bằng mật khẩu mới.
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn color="primary" variant="flat" @click="goToLogin">
          Đăng nhập
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
