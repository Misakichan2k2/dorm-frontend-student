<script setup>
import { computed, ref } from "vue";
import Step1 from "./components/Step1.vue";
import Step2 from "./components/Step2.vue";
import Step3 from "./components/Step3.vue";
import { STORE_REGISTRATION, STORE_AUTH } from "@/services/stores";
import PopupMessage from "@/components/PopupMessage.vue";
import { appLocalStorage } from "@/utils";

const step2Ref = ref();
const step = ref(1);

const goToStep = (next) => {
  step.value = next;
  onChangeStep(next);
};

const items = ["Thông tin cá nhân", "Chọn phòng thuê", "Thanh toán"];

const { onActionCreateRegistration, onActionGetMyRegistration } =
  STORE_REGISTRATION.StoreRegistration();

const { onActionHasRegistration } = STORE_AUTH.StoreAuth();
const paymentInfo = ref({});

const step1Data = ref({});
const step2Data = ref(null);

const onChangeStep = async (event) => {
  if (event === 3) {
    const raw = { ...step1Data.value, ...step2Ref.value.data };
    const formData = new FormData();

    Object.entries(raw).forEach(([key, value]) => {
      if (key === "address" && typeof value === "object") {
        // Gửi từng phần trong address riêng biệt
        for (const [subKey, subValue] of Object.entries(value)) {
          formData.append(`address.${subKey}`, subValue || "");
        }
      } else if (key === "image" && value) {
        formData.append("image", value); // ảnh
      } else {
        formData.append(key, value ?? "");
      }
    });

    await onActionCreateRegistration(formData).then(() => {
      onActionHasRegistration().then((res) => {
        onActionGetMyRegistration().then((resprofile) => {
          console.log(resprofile);
          appLocalStorage.value.userData = {
            ...appLocalStorage.value.userData,
            hasRegistration: res?.data?.hasRegistration,
            fullname: resprofile?.data?.data?.fullname,
            image: resprofile?.data?.data?.image,
          };
        });
      });
    });

    const res = await onActionGetMyRegistration();
    paymentInfo.value = res.data.data;
  }
};
</script>

<template>
  <PopupMessage />

  <v-stepper
    v-model:model-value="step"
    :items="items"
    show-actions
    @update:model-value="onChangeStep"
  >
    <template v-slot:item.1>
      <Step1 v-model="step1Data" />
    </template>

    <template v-slot:item.2>
      <Step2
        :step1Data="step1Data"
        v-model="step2Data"
        ref="step2Ref"
        @confirm-success="goToStep(3)"
      />
    </template>

    <template v-slot:item.3>
      <Step3 :paymentInfo="paymentInfo" />
    </template>
  </v-stepper>
</template>

<style scoped></style>
