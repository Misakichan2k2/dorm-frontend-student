<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { STORE_AUTH } from "@/services/stores";

const { onActionSignUp } = STORE_AUTH.StoreAuth();

const router = useRouter();

const form = ref(false);
const email = ref(null);
const password = ref(null);
const loading = ref(false);
const fullname = ref(null);
const terms = ref(false);
const termsError = ref(false);
const confirmPassword = ref(null);
const confirmPasswordError = ref("");

function onSubmit() {
  if (!form.value) return;

  // Kiểm tra nếu chưa đồng ý điều khoản
  if (!terms.value) {
    termsError.value = true;
    loading.value = false;
    return;
  } else {
    termsError.value = false;
  }

  // Kiểm tra xác nhận mật khẩu
  if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = "Mật khẩu xác nhận không khớp!";
    loading.value = false;
    return;
  } else {
    confirmPasswordError.value = "";
  }

  loading.value = true;

  const values = {
    fullname: fullname.value,
    email: email.value,
    password: password.value,
    terms: terms.value,
  };

  onActionSignUp(values)
    .then((res) => {
      loading.value = false;
      if (res.status === 201) {
        router.push({ name: "SignIn" });
      }
    })
    .catch((error) => {
      console.error(error);
      loading.value = false;
    });
}

function required(v) {
  return !!v || "Field is required";
}

const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template>
  <v-container fluid class="fill-height pa-0 ma-0">
    <v-img
      src="/public/images/sign-in-background.jpg"
      class="background"
      cover
      height="100vh"
    >
      <v-row align="center" justify="center" style="height: 100%">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="mx-auto px-6 py-8 glass-card" max-width="355">
            <v-form v-model="form" @submit.prevent="onSubmit">
              <div class="text-center mb-3">
                <span class="font-weight-bold text-h5">Đăng ký</span>
              </div>

              <v-text-field
                v-model="fullname"
                :readonly="loading"
                :rules="[required]"
                color="primary"
                label="Full Name"
                variant="underlined"
                clearable
              ></v-text-field>

              <v-text-field
                v-model="email"
                :readonly="loading"
                :rules="[required]"
                color="primary"
                label="Email"
                variant="underlined"
                clearable
              ></v-text-field>

              <v-text-field
                v-model="password"
                :readonly="loading"
                :rules="[required]"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                placeholder="Enter your password"
                color="primary"
                variant="underlined"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="togglePassword"
              ></v-text-field>

              <v-text-field
                v-model="confirmPassword"
                :readonly="loading"
                :rules="[required]"
                :type="showPassword ? 'text' : 'password'"
                label="Xác nhận mật khẩu"
                placeholder="Nhập lại mật khẩu"
                color="primary"
                variant="underlined"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="togglePassword"
              />

              <!-- Hiển thị lỗi nếu mật khẩu không khớp -->
              <span v-if="confirmPasswordError" class="text-red">
                {{ confirmPasswordError }}
              </span>

              <v-checkbox
                v-model="terms"
                color="secondary"
                label="Tôi đồng ý với các điều khoản và điều kiện của trang web"
                hide-details
              ></v-checkbox>

              <!-- Thông báo lỗi nếu chưa đồng ý -->
              <span v-if="termsError" class="text-red">
                Bạn phải đồng ý với điều khoản và điều kiện!
              </span>

              <v-btn
                :disabled="!form"
                :loading="loading"
                color="blue"
                size="large"
                type="submit"
                elevation="0"
                block
              >
                Sign Up
              </v-btn>
            </v-form>

            <v-row
              justify="center"
              class="mt-5"
              style="flex-direction: row; gap: 0.2rem"
            >
              <span>Đã có tài khoản?</span>
              <router-link
                to="/sign-in"
                class="custom-link text-primary font-weight-bold"
              >
                Đăng nhập
              </router-link>
            </v-row>

            <br />
          </v-card>
        </v-col>
      </v-row>
    </v-img>
  </v-container>
</template>

<style scoped>
.glass-card {
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
}

.custom-link {
  text-decoration: none;
}

.custom-link:hover {
  text-decoration: underline;
}
</style>
