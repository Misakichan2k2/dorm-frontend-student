<script setup>
import { computed, ref } from "vue";
import Step1 from "./components/Step1.vue";
import Step2 from "./components/Step2.vue";
import Step3 from "./components/Step3.vue";
import { STORE_REGISTRATION } from "@/services/stores";
import PopupMessage from "@/components/PopupMessage.vue";

const step2Ref = ref();
const shipping = ref(0);
const step = ref(1);
const subtotal = computed(() =>
  products.reduce((acc, product) => acc + product.quantity * product.price, 0)
);
const total = computed(() => subtotal.value + Number(shipping.value ?? 0));

const items = ["Thông tin cá nhân", "Chọn phòng thuê", "Thanh toán"];
const products = [
  {
    name: "Product 1",
    price: 10,
    quantity: 2,
  },
  {
    name: "Product 2",
    price: 15,
    quantity: 10,
  },
];

const { onActionCreateRegistration, onActionGetMyRegistration } =
  STORE_REGISTRATION.StoreRegistration();

const dataValue = ref();
const paymentInfo = ref({});

const step1Data = ref({});
const step2Data = ref(null);

const onChangeStep = async (event) => {
  console.log(event);
  if (event === 3) {
    let body = { ...step1Data.value, ...step2Ref.value.data };
    console.log(body);

    await onActionCreateRegistration(body).then(async () => {
      await onActionGetMyRegistration().then((res) => {
        paymentInfo.value = res.data.data;
      });
    });
  }
};
</script>

<template>
  <PopupMessage />

  <v-stepper :items="items" show-actions @update:model-value="onChangeStep">
    <template v-slot:item.1>
      <Step1 v-model="step1Data" />
    </template>

    <template v-slot:item.2>
      <Step2 :step1Data="step1Data" v-model="step2Data" ref="step2Ref" />
    </template>

    <template v-slot:item.3>
      <Step3 :paymentInfo="paymentInfo" />
    </template>
  </v-stepper>
</template>

<style scoped></style>
