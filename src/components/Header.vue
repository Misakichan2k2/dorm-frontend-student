<script setup></script>

<template>
  <div class="header">
    <div></div>
    <div class="actions">
      <v-btn
        prepend-icon="mdi-plus-circle-outline"
        elevation="0"
        color="blue-darken-2"
        class="text-body-2"
        to="/room-registration"
        >Đăng ký phòng</v-btn
      >
      <!-- <button @click="notify">
        <i class="mdi mdi-bell"></i>
      </button> -->

      <router-link to="/profile" class="ml-5" style="text-decoration: none">
        <v-avatar size="35">
          <v-img
            src="https://pbs.twimg.com/profile_images/481865412657684481/Nl5wU0EL_400x400.jpeg"
            alt="Avatar"
          ></v-img>
        </v-avatar>
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
