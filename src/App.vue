<script setup>
import Header from "./components/Header.vue";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <v-app>
    <!-- Sidebar cố định -->
    <Navbar />

    <!-- Nội dung chính -->
    <v-main class="d-flex flex-column background">
      <Header />
      <div class="content flex-grow-1 bg-grey-lighten-4">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<style scoped>
.content {
  padding: 1rem;
}

.background {
  background: linear-gradient(#f6fcfe, #e6f5ff, #fff2fc);
}
</style>
