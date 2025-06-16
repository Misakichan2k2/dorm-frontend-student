<script setup>
import { ref } from "vue";
import { STORE_AUTH } from "@/services/stores";

const { onActionChangePassword } = STORE_AUTH.StoreAuth();

const form = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const showCurrent = ref(false);
const showNew = ref(false);
const showConfirm = ref(false);

const valid = ref(false);
const formRef = ref(null);

const snackbar = ref({
  show: false,
  text: "",
  color: "success",
});

const rules = {
  min: (v) => (v && v.length >= 8) || "Ít nhất 8 ký tự.",
  match: (v) => v === form.value.newPassword || "Mật khẩu xác nhận không khớp.",
};

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate();
  if (!valid) return;

  const success = await onActionChangePassword(form.value);

  if (success) {
    snackbar.value = {
      show: true,
      text: "Mật khẩu đã được thay đổi.",
      color: "success",
    };

    setTimeout(() => {
      formRef.value.reset();
    }, 300);
  }
};
</script>

<template>
  <v-container class="d-flex justify-center align-center mt-16">
    <v-card class="pa-6" width="500" elevation="4">
      <v-card-title class="text-h6 font-weight-bold text-center mb-2"
        >Đổi mật khẩu</v-card-title
      >

      <v-form v-model="valid" ref="formRef" @submit.prevent="handleSubmit">
        <v-text-field
          v-model="form.currentPassword"
          :type="showCurrent ? 'text' : 'password'"
          label="Mật khẩu hiện tại"
          :append-inner-icon="showCurrent ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showCurrent = !showCurrent"
          variant="outlined"
          class="mb-3"
        />

        <v-text-field
          v-model="form.newPassword"
          :type="showNew ? 'text' : 'password'"
          label="Mật khẩu mới"
          :append-inner-icon="showNew ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showNew = !showNew"
          :rules="[rules.min]"
          variant="outlined"
          class="mb-3"
        />

        <v-text-field
          v-model="form.confirmPassword"
          :type="showConfirm ? 'text' : 'password'"
          label="Xác nhận mật khẩu mới"
          :append-inner-icon="showConfirm ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showConfirm = !showConfirm"
          :rules="[rules.match]"
          variant="outlined"
          class="mb-3"
        />

        <v-btn
          type="submit"
          color="primary"
          block
          class="mt-2"
          :disabled="!valid"
        >
          Xác nhận thay đổi
        </v-btn>
      </v-form>
    </v-card>

    <!-- Snackbar thông báo -->
    <v-snackbar
      location="top right"
      v-model="snackbar.show"
      :color="snackbar.color"
      timeout="3000"
    >
      {{ snackbar.text }}
    </v-snackbar>
  </v-container>
</template>
