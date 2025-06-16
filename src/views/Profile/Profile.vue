<script setup>
import { ref, onMounted } from "vue";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { STORE_STUDENT_PROFILE } from "@/services/stores";
import provinces from "@/data/province";
import districts from "@/data/districts";
import wards from "@/data/ward";
import InfoItem from "./components/InfoItem.vue";

const { onActionGetMyProfileRegistration } =
  STORE_STUDENT_PROFILE.StoreStudentProfile();

const user = ref({});
const showImageDialog = ref(false);

const formatDate = (date) => {
  return date ? format(new Date(date), "dd/MM/yyyy", { locale: vi }) : "";
};

const getNameByCode = (list, code, key = "code") =>
  list.find((item) => item[key] === code)?.name || "Không xác định";

onMounted(async () => {
  try {
    const res = await onActionGetMyProfileRegistration();
    user.value = res.data.data;
  } catch (err) {
    console.error(err);
  }
});
</script>

<template>
  <v-container class="pa-2" max-width="2000">
    <v-card class="mb-5 pb-5">
      <v-card-title>
        <v-icon class="me-2" color="primary">mdi-account</v-icon>
        Thông tin cá nhân
      </v-card-title>
      <v-divider />

      <v-row class="mt-2 d-flex align-center">
        <v-col cols="12" md="3" class="text-center">
          <v-tooltip text="Ấn để xem ảnh" location="top">
            <template #activator="{ props }">
              <v-avatar
                v-bind="props"
                size="150"
                @click="showImageDialog = true"
                style="cursor: pointer"
              >
                <v-img :src="user.image" alt="Avatar"></v-img>
              </v-avatar>
            </template>
          </v-tooltip>
        </v-col>

        <v-col>
          <v-card-text>
            <v-row dense>
              <InfoItem label="Họ và tên">{{ user.fullname }}</InfoItem>
              <InfoItem label="Ngày sinh">{{
                formatDate(user.birthDate)
              }}</InfoItem>
              <InfoItem label="Giới tính">{{ user.gender }}</InfoItem>
              <InfoItem label="Tôn giáo">{{ user.religion }}</InfoItem>
              <InfoItem label="Dân tộc">{{ user.ethnicity }}</InfoItem>
              <InfoItem label="CMND/CCCD">{{ user.identityNumber }}</InfoItem>
            </v-row>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>

    <!-- Hộ khẩu -->
    <v-card class="mb-5">
      <v-card-title>
        <v-icon class="me-2" color="primary">mdi-home-city-outline</v-icon>
        Thông tin hộ khẩu
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row dense>
          <InfoItem label="Tỉnh/Thành phố">{{
            getNameByCode(provinces, user.address?.provinceCode)
          }}</InfoItem>
          <InfoItem label="Quận/Huyện">{{
            getNameByCode(districts, user.address?.districtCode)
          }}</InfoItem>
          <InfoItem label="Phường/Xã">{{
            getNameByCode(wards, user.address?.wardCode)
          }}</InfoItem>
          <InfoItem label="Địa chỉ cụ thể">{{ user.address?.street }}</InfoItem>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Học tập -->
    <v-card class="mb-5">
      <v-card-title>
        <v-icon class="me-2" color="primary">mdi-school-outline</v-icon>
        Thông tin học tập
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row dense>
          <InfoItem label="Mã sinh viên">{{ user.studentId }}</InfoItem>
          <InfoItem label="Khóa">{{ user.course }}</InfoItem>
          <InfoItem label="Trường/Viện">{{ user.school }}</InfoItem>
          <InfoItem label="Lớp">{{ user.class }}</InfoItem>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Liên hệ -->
    <v-card>
      <v-card-title>
        <v-icon class="me-2" color="primary">mdi-phone-outline</v-icon>
        Thông tin liên hệ
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row dense>
          <InfoItem label="Số điện thoại">{{ user.phone }}</InfoItem>
          <InfoItem label="Email">{{ user.email }}</InfoItem>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Dialog hiển thị ảnh lớn -->
    <v-dialog v-model="showImageDialog" max-width="700">
      <div>
        <v-img :src="user.image" />
      </div>
      <div class="d-flex justify-end bg-white">
        <v-btn variant="text" @click="showImageDialog = false">Đóng</v-btn>
      </div>
    </v-dialog>
  </v-container>
</template>
