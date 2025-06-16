<script setup>
import { ref } from "vue";
import RentedRoom from "./components/RentedRoom.vue";
import RoomRequest from "./components/RoomRequest.vue";

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
      <v-tab value="one">Thông tin đăng ký phòng</v-tab>
      <v-tab value="two">Thông tin phòng thuê</v-tab>
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="one"> <RoomRequest /> </v-tabs-window-item>
        <v-tabs-window-item value="two"> <RentedRoom /> </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>
