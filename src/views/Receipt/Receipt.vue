<script setup>
import { ref } from "vue";
import ElectricityBill from "./components/ElectricityBill.vue";
import WaterBill from "./components/WaterBill.vue";

const tab = ref(null);
</script>

<template>
  <v-card flat>
    <v-tabs
      v-model="tab"
      bg-color="white"
      color="primary"
      center-active
      class="border-b-sm"
    >
      <v-tab value="one">Hóa đơn điện</v-tab>
      <v-tab value="two">Hóa đơn nước</v-tab>
    </v-tabs>

    <v-card-text class="pa-0 bg-grey-lighten-4">
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="one">
          <ElectricityBill />
        </v-tabs-window-item>

        <v-tabs-window-item value="two"> <WaterBill /> </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>
