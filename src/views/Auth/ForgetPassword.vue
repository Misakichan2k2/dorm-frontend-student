<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { STORE_AUTH } from "@/services/stores";

const { onActionForgetPassword } = STORE_AUTH.StoreAuth();

const email = ref("");
const loading = ref(false);
const dialog = ref(false);
const router = useRouter();

const handleSubmit = async () => {
  if (!email.value) return;

  loading.value = true;
  try {
    const res = await onActionForgetPassword(email.value);
    dialog.value = true;
  } catch (err) {
    console.error(err.response?.data?.message || err.message);
  } finally {
    loading.value = false;
  }
};

const closeDialog = () => {
  dialog.value = false;
  email.value = "";
};
</script>

<template>
  <div style="min-height: 100vh" class="d-flex justify-center">
    <v-img src="/public/images/background-2.jpg" cover height="100vh">
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
            <v-icon color="white" size="36">mdi-shield-lock-outline</v-icon>
          </div>

          <!-- Form chính -->
          <v-card
            class="pa-6 pt-10 rounded-lg"
            elevation="5"
            style="margin-top: 40px"
          >
            <v-card-title class="text-h5 font-weight-bold text-center">
              Quên mật khẩu?
            </v-card-title>
            <v-card-subtitle class="text-center text-body-2 mb-3">
              Vui lòng nhập email để nhận liên kết khôi phục mật khẩu.
            </v-card-subtitle>

            <v-form @submit.prevent="handleSubmit">
              <v-text-field
                v-model="email"
                placeholder="Email"
                variant="outlined"
                type="email"
                class="mb-4"
                required
              />

              <v-btn
                :loading="loading"
                type="submit"
                color="primary"
                block
                class="mb-2"
                elevation="0"
                size="large"
              >
                Gửi liên kết
              </v-btn>
              <v-row class="align-center my-4">
                <v-col>
                  <v-divider />
                </v-col>
                <span class="mx-2 text-grey">Hoặc</span>
                <v-col>
                  <v-divider />
                </v-col>
              </v-row>
              <v-btn
                variant="text"
                color="primary"
                size="large"
                style="text-transform: none"
                block
                @click="router.push({ name: 'SignIn' })"
              >
                Quay lại màn hình đăng nhập
              </v-btn>
            </v-form>
          </v-card>
        </v-container>
      </div>
    </v-img>

    <!-- Dialog thông báo -->
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card class="pa-4">
        <v-card-title class="justify-center">
          <v-icon color="primary" size="36" class="mr-2"
            >mdi-email-check-outline</v-icon
          >
          <span class="text-h6 font-weight-bold">Liên kết đã được gửi</span>
        </v-card-title>
        <v-card-text class="text-center pt-3">
          Chúng tôi đã gửi một liên kết đặt lại mật khẩu đến email của bạn. Vui
          lòng kiểm tra hộp thư đến hoặc thư rác.
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="primary" @click="closeDialog">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
