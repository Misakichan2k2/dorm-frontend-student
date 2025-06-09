<script setup>
import { computed, ref, watch, onMounted } from "vue";
import provincesData from "@/data/province";
import districtsData from "@/data/districts";
import wardsData from "@/data/ward";

defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const provinces = ref(provincesData);
const districts = ref(districtsData);
const wards = ref(wardsData);

const terms = ref(false);
const valid = ref(false);
const formData = ref({
  fullname: "",
  birthDate: null,
  gender: "",
  religion: "",
  ethnicity: "",
  identityNumber: "",
  studentId: "",
  course: "",
  school: "",
  class: "",
  address: { provinceCode: "", districtCode: "", wardCode: "", street: "" },
  phone: "",
  email: "",
  image: null,
});

const filteredDistricts = computed(() =>
  districts.value.filter(
    (d) => d.provinceCode === formData.value.address.provinceCode
  )
);
const filteredWards = computed(() =>
  wards.value.filter(
    (w) => w.districtCode === formData.value.address.districtCode
  )
);

const rules = {
  required: (v) => !!v || "Trường này là bắt buộc",
  phone: (v) => /^\d{10}$/.test(v) || "Số điện thoại phải có 10 số",
};

const form = ref(null);

watch(
  formData,
  (val) => {
    console.log(val);

    emit("update:modelValue", val);
  },
  { deep: true }
);
</script>

<template>
  <v-card class="pa-4 mx-auto mb-5" max-width="1200">
    <v-form ref="form" v-model="valid">
      <div>
        <h2 class="mb-3">Thông tin cá nhân</h2>
        <v-row justify="space-between">
          <v-col cols="12" md="6">
            <span>Họ và tên <span class="text-red-darken-4">*</span></span>
            <v-text-field
              v-model="formData.fullname"
              :rules="[rules.required]"
              placeholder="Nhập họ và tên"
              variant="outlined"
              density="compact"
            />

            <span>Ngày sinh <span class="text-red-darken-4">*</span></span>
            <div class="d-flex justify-center">
              <v-date-input
                v-model="formData.birthDate"
                prepend-icon=""
                append-inner-icon="mdi-calendar"
                variant="outlined"
                density="compact"
              ></v-date-input>
            </div>

            <span>Giới tính <span class="text-red-darken-4">*</span></span>
            <v-select
              v-model="formData.gender"
              :items="['Nam', 'Nữ']"
              :rules="[rules.required]"
              variant="outlined"
              placeholder="Chọn giới tính"
              density="compact"
            />

            <span>Ảnh đại diện<span class="text-red-darken-4">*</span></span>
            <div class="pb-5">
              <v-file-upload
                v-model="formData.image"
                title="Kéo thả tập tin vào đây"
                divider-text="hoặc"
                browse-text="Chọn tệp"
                accept="image/*"
                clearable
                density="default"
              ></v-file-upload>
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <span>Tôn giáo <span class="text-red-darken-4">*</span></span>
            <v-text-field
              v-model="formData.religion"
              :rules="[rules.required]"
              placeholder="Nhập tôn giáo"
              variant="outlined"
              density="compact"
            />

            <span>Dân tộc <span class="text-red-darken-4">*</span></span>
            <v-text-field
              v-model="formData.ethnicity"
              :rules="[rules.required]"
              placeholder="Nhập dân tộc"
              variant="outlined"
              density="compact"
            />

            <span
              >CCCD/CMND/Hộ chiếu <span class="text-red-darken-4">*</span></span
            >
            <v-text-field
              v-model="formData.identityNumber"
              :rules="[rules.required]"
              placeholder="Nhập số CCCD"
              variant="outlined"
              density="compact"
            />
          </v-col>
        </v-row>
      </div>

      <div>
        <h2 class="mb-3">Hộ khẩu</h2>
        <v-row justify="space-between">
          <v-col cols="12" md="6">
            <span>Tỉnh/Thành phố <span class="text-red-darken-4">*</span></span>
            <v-autocomplete
              v-model="formData.address.provinceCode"
              :items="provinces"
              item-title="name"
              item-value="code"
              :rules="[rules.required]"
              variant="outlined"
              density="compact"
            />

            <span>Phường/Xã <span class="text-red-darken-4">*</span></span>
            <v-autocomplete
              v-model="formData.address.wardCode"
              :items="filteredWards"
              item-title="name"
              item-value="code"
              :rules="[rules.required]"
              variant="outlined"
              density="compact"
            />
          </v-col>

          <v-col cols="12" md="6">
            <span>Quận/Huyện <span class="text-red-darken-4">*</span></span>
            <v-autocomplete
              v-model="formData.address.districtCode"
              :items="filteredDistricts"
              item-title="name"
              item-value="code"
              :rules="[rules.required]"
              variant="outlined"
              density="compact"
            />

            <span
              >Số nhà/Đường/Thôn<span class="text-red-darken-4">*</span></span
            >
            <v-text-field
              v-model="formData.address.street"
              placeholder="Nhập số nhà/đường/thôn"
              variant="outlined"
              density="compact"
            />
          </v-col>
        </v-row>
      </div>

      <div>
        <h2 class="mb-3">Lớp học</h2>
        <v-row justify="space-between">
          <v-col cols="12" md="6">
            <span
              >Mã số sinh viên <span class="text-red-darken-4">*</span></span
            >
            <v-text-field
              v-model="formData.studentId"
              :rules="[rules.required]"
              placeholder="Nhập mã sinh viên"
              variant="outlined"
              density="compact"
            />

            <span>Khóa <span class="text-red-darken-4">*</span></span>
            <v-text-field
              v-model="formData.course"
              placeholder="Nhập khóa"
              variant="outlined"
              density="compact"
            />
          </v-col>

          <v-col cols="12" md="6">
            <span>Trường/Viện <span class="text-red-darken-4">*</span></span>
            <v-text-field
              v-model="formData.school"
              :rules="[rules.required]"
              placeholder="Nhập tên trường"
              variant="outlined"
              density="compact"
            />

            <span>Lớp <span class="text-red-darken-4">*</span></span>
            <v-text-field
              v-model="formData.class"
              placeholder="Nhập lớp"
              variant="outlined"
              density="compact"
            />
          </v-col>
        </v-row>
      </div>

      <div class="mb-2">
        <h2 class="mb-3">Liên hệ</h2>
        <v-row justify="space-between">
          <v-col cols="12" md="6">
            <span>Số điện thoại <span class="text-red-darken-4">*</span></span>
            <v-text-field
              v-model="formData.phone"
              :rules="[rules.required, rules.phone]"
              placeholder="Nhập số điện thoại"
              variant="outlined"
              density="compact"
            />
          </v-col>

          <v-col cols="12" md="6">
            <span>Email <span class="text-red-darken-4">*</span></span>
            <v-text-field
              v-model="formData.email"
              :rules="[rules.required]"
              placeholder="Nhập email"
              type="email"
              variant="outlined"
              density="compact"
            />
          </v-col>
        </v-row>
      </div>

      <hr />

      <div class="mt-5">
        <h2>Xác nhận</h2>
        <v-checkbox
          v-model="terms"
          color="secondary"
          hide-details
          label="Tôi xin cam đoan những lời khai trên đây là đúng sự thật và chịu trách nhiệm cho những lời khai này."
        ></v-checkbox>
      </div>
    </v-form>
  </v-card>
</template>

<style scoped>
::v-deep(.v-file-upload) {
  padding: 10px !important;
}

::v-deep(.v-file-upload-divider) {
  margin: 1rem;
}
</style>
