<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { STORE_AUTH, STORE_STUDENT_PROFILE } from "@/services/stores";
import { appLocalStorage, ENUM } from "@/utils";

const { onActionSignIn, onActionHasRegistration } = STORE_AUTH.StoreAuth();
const { onActionGetMyProfileRegistration } =
  STORE_STUDENT_PROFILE.StoreStudentProfile();

const router = useRouter();

const email = ref(null);
const password = ref(null);
const loading = ref(false);
const formRef = ref(null);

async function onSubmit() {
  const { valid } = await formRef.value.validate();
  if (!valid) return;

  loading.value = true;

  await onActionSignIn({
    email: email.value,
    password: password.value,
  })
    .then(async (res) => {
      appLocalStorage.value.userData = res?.data || ENUM.USER_DATA;
      appLocalStorage.value.accessToken = res?.data?.token || "";

      await onActionHasRegistration().then((res) => {
        if (res?.data?.hasRegistration) {
          onActionGetMyProfileRegistration().then((resprofile) => {
            console.log(resprofile);

            appLocalStorage.value.userData = {
              ...appLocalStorage.value.userData,
              hasRegistration: res?.data?.hasRegistration,
              fullname: resprofile?.data?.data?.fullname,
              image: resprofile?.data?.data?.image,
            };
          });

          router.push("/profile");
        } else {
          appLocalStorage.value.userData = {
            ...appLocalStorage.value.userData,
            hasRegistration: res?.data?.hasRegistration,
          };

          router.push("/room-registration");
        }
      });
    })
    .finally(() => {
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
    <v-img src="/public/images/sign-in-background.jpg" cover height="100vh">
      <v-row align="center" justify="center" style="height: 100%">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="mx-auto px-6 glass-card" max-width="385">
            <v-form
              ref="formRef"
              @submit.prevent="onSubmit"
              class="px-4 py-6"
              style="max-width: 420px; margin: auto"
            >
              <div class="text-center mb-6">
                <v-icon size="48" color="primary" class="mb-2"
                  >mdi-account-circle</v-icon
                >
                <v-col class="font-weight-bold text-h5"
                  >Đăng nhập sinh viên</v-col
                >
                <v-card-subtitle class="text-grey">
                  Sử dụng email và mật khẩu để đăng nhập
                </v-card-subtitle>
              </div>

              <v-text-field
                v-model="email"
                :readonly="loading"
                :rules="[required]"
                label="Email"
                placeholder="example@student.edu.vn"
                type="email"
                variant="outlined"
                color="primary"
                prepend-inner-icon="mdi-email-outline"
                class="mb-4"
              />

              <v-text-field
                v-model="password"
                :readonly="loading"
                :rules="[required]"
                :type="showPassword ? 'text' : 'password'"
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                variant="outlined"
                color="primary"
                prepend-inner-icon="mdi-lock-outline"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="togglePassword"
              />

              <v-row justify="end" class="mb-3">
                <v-col cols="auto">
                  <router-link
                    class="text-primary text-decoration-none font-weight-medium"
                    to="/forgot-password"
                  >
                    <span class="custom-link">Quên mật khẩu?</span>
                  </router-link>
                </v-col>
              </v-row>

              <v-btn
                :loading="loading"
                block
                color="primary"
                size="large"
                type="submit"
                elevation="2"
                class="font-weight-bold"
              >
                Đăng nhập
              </v-btn>
            </v-form>

            <v-row
              justify="center"
              class="mt-1"
              style="flex-direction: row; gap: 0.2rem"
            >
              <span>Chưa có tài khoản?</span>
              <router-link
                to="/sign-up"
                class="custom-link text-primary font-weight-bold"
              >
                Đăng ký
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

input:-webkit-autofill {
  box-shadow: 0 0 0 1000px #fff inset !important;
  -webkit-box-shadow: 0 0 0 1000px #fff inset !important;
  -webkit-text-fill-color: #000 !important;
}
</style>
