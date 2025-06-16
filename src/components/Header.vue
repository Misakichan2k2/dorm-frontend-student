<script setup>
import { ref, onMounted } from "vue";
import { appLocalStorage } from "@/utils";
import { STORE_STUDENT_PROFILE } from "@/services/stores";

const { onActionGetMyProfileRegistration } =
  STORE_STUDENT_PROFILE.StoreStudentProfile();
const user = ref({});

onMounted(async () => {
  const res = await onActionGetMyProfileRegistration();
  user.value = res.data.data;
});
</script>

<template>
  <div class="header">
    <div></div>
    <div class="actions">
      <v-btn
        v-if="appLocalStorage?.userData?.hasRegistration"
        prepend-icon="mdi-plus-circle-outline"
        elevation="0"
        color="blue-darken-2"
        class="text-body-2"
        to="/room-registration"
        >Đăng ký phòng</v-btn
      >

      <router-link
        to="/profile"
        class="ml-5"
        style="text-decoration: none"
        v-if="appLocalStorage?.userData?.hasRegistration"
      >
        <v-avatar size="35">
          <v-img :src="user?.image" alt="Avatar"></v-img>
        </v-avatar>
        {{ user?.fullname }}
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: linear-gradient(to right, #fcfeff, #eef8ff, #fff4fd);
  border-bottom: 1px solid #e1e1e1;
}

.actions button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  margin-left: 10px;
}
</style>
