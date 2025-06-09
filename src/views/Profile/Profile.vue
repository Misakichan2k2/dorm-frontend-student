<script setup>
import { ref, onMounted, computed } from "vue";
import provinces from "@/data/province";
import districts from "@/data/districts";
import wards from "@/data/ward";
import { STORE_STUDENT_PROFILE } from "@/services/stores";

const { onActionGetMyProfileRegistration } =
  STORE_STUDENT_PROFILE.StoreStudentProfile();

const user = ref({});

// const loadProfile = async () => {
//   const res = await onActionGetMyProfileRegistration();
//   if (res.success) {
//     const data = res.data.registration;
//     user.value.fullname = data.fullname;
//     user.value.birthDate = new Date(data.birthDate).toLocaleDateString("vi-VN");
//     user.value.gender = data.gender;
//     user.value.religion = data.religion;
//     user.value.ethnicity = data.ethnicity;
//     user.value.identityNumberNumber = data.identityNumber;
//     user.value.studentId = data.studentId;
//     user.value.course = data.course;
//     user.value.school = data.school;
//     user.value.class = data.class;
//     user.value.phone = data.phone;
//     user.value.email = data.email;
//     user.value.province = data.address?.provinceCode || "";
//     user.value.district = data.address?.districtCode || "";
//     user.value.ward = data.address?.wardCode || "";
//     user.value.street = data.address?.street || "";
//   }
// };

const provinceName = computed(() => {
  const code = user.value?.address?.provinceCode;
  return provinces.find((p) => p.code === code)?.name || "Không xác định";
});

const districtName = computed(() => {
  const code = user.value?.address?.districtCode;
  return districts.find((d) => d.code === code)?.name || "Không xác định";
});

const wardName = computed(() => {
  const code = user.value?.address?.wardCode;
  return wards.find((w) => w.code === code)?.name || "Không xác định";
});

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

onMounted(async () => {
  await onActionGetMyProfileRegistration().then((res) => {
    console.log(res);

    user.value = res?.data?.data;
  });
});
</script>

<template>
  <v-container class="pa-0">
    <v-card flat class="pt-2 pb-10 pa-8">
      <v-card-title class="text-h5 text-center text-primary">
        Thông tin cá nhân
      </v-card-title>
      <v-divider></v-divider>

      <div class="py-5 ga-5 d-flex" align="center">
        <v-col cols="12" md="3" class="text-center">
          <v-avatar size="180">
            <v-img
              src="https://pbs.twimg.com/profile_images/481865412657684481/Nl5wU0EL_400x400.jpeg"
              alt="Avatar"
            ></v-img>
          </v-avatar>
        </v-col>

        <v-col cols="12" md="9">
          <v-row>
            <v-col cols="4" class="font-weight-bold text-start"
              >Họ và Tên:
            </v-col>
            <v-col cols="8" v-text="user.fullname"></v-col>

            <v-col cols="4" class="font-weight-bold text-start"
              >Ngày sinh:
            </v-col>
            <v-col cols="8" v-text="formatDate(user.birthDate)"></v-col>

            <v-col cols="4" class="font-weight-bold text-start"
              >Giới tính:
            </v-col>
            <v-col cols="8" v-text="user.gender"></v-col>

            <v-col cols="4" class="font-weight-bold text-start"
              >Tôn giáo:
            </v-col>
            <v-col cols="8" v-text="user.religion"></v-col>

            <v-col cols="4" class="font-weight-bold text-start">Dân tộc:</v-col>
            <v-col cols="8" v-text="user.ethnicity"></v-col>

            <v-col cols="4" class="font-weight-bold text-start">
              CCCD/CMND/Hộ chiếu:
            </v-col>
            <v-col cols="8" v-text="user.identityNumber"></v-col>
          </v-row>
        </v-col>
      </div>

      <v-divider></v-divider>
      <div class="py-4">
        <p class="font-weight-bold mb-4" style="font-size: 1.2rem">Lớp học</p>

        <v-row>
          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="5" class="font-weight-bold text-start"
                >Mã số sinh viên:</v-col
              >
              <v-col cols="7" v-text="user.studentId"></v-col>

              <v-col cols="5" class="font-weight-bold text-start">Khóa:</v-col>
              <v-col cols="7" v-text="user.course"></v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="4" class="font-weight-bold text-start"
                >Trường/Viện:</v-col
              >
              <v-col cols="7" v-text="user.school"></v-col>

              <v-col cols="4" class="font-weight-bold text-start">Lớp:</v-col>
              <v-col cols="7" v-text="user.class"></v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>

      <v-divider></v-divider>
      <div class="py-5">
        <p class="font-weight-bold pb-4" style="font-size: 1.2rem">Hộ khẩu</p>

        <v-row>
          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="5" class="font-weight-bold text-start"
                >Tỉnh/Thành phố:</v-col
              >
              <v-col cols="7" v-text="provinceName"></v-col>

              <v-col cols="5" class="font-weight-bold text-start"
                >Quận/Huyện:</v-col
              >
              <v-col cols="7" v-text="districtName"></v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="4" class="font-weight-bold text-start"
                >Phường/Xã:</v-col
              >
              <v-col cols="7" v-text="wardName"></v-col>

              <v-col cols="4" class="font-weight-bold text-start"
                >Địa chỉ:</v-col
              >
              <v-col cols="7" v-text="user?.address?.street"></v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>

      <v-divider></v-divider>
      <div class="py-5">
        <p class="font-weight-bold pb-4" style="font-size: 1.2rem">Liên hệ</p>

        <v-row>
          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="5" class="font-weight-bold text-start"
                >Số điện thoại:</v-col
              >
              <v-col cols="7" v-text="user.phone"></v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="4" class="font-weight-bold text-start">Email:</v-col>
              <v-col cols="7" v-text="user.email"></v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-container>
</template>

<style scoped>
.avatar-img {
  border-radius: 50%;
  width: 100%;
}

.v-card-title {
  font-weight: bold;
  padding: 10px 0;
}

.v-col {
  display: flex;
  align-items: center;
}

.text-start {
  text-align: left;
  color: #444;
}

.font-weight-bold {
  font-weight: bold;
}
</style>
