<script setup lang="ts">
import { ref } from "vue";
import { onDeleteAppLocalStorage } from "@/utils";

const drawer = ref(true);
const rail = ref(false);

const toggleRail = () => {
  rail.value = !rail.value;
};

const onLogout = () => {
  onDeleteAppLocalStorage();
};
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    class="glass-card"
    permanent
    app
  >
    <!-- Header -->
    <v-list-item nav>
      <v-list-item-title
        v-if="!rail"
        class="pl-2 font-weight-bold text-blue-darken-3 text-subtitle-1"
      >
        Quản lý ký túc xá
      </v-list-item-title>

      <template v-slot:append>
        <v-btn icon="mdi-view-list" variant="text" @click.stop="toggleRail" />
      </template>
    </v-list-item>

    <v-divider />

    <!-- Menu items -->
    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-account"
        title="Thông tin cá nhân"
        :to="'/profile'"
      />
      <v-list-item
        prepend-icon="mdi-clipboard-text"
        title="Thông tin phòng"
        :to="'/room-info'"
      />
      <v-list-item
        prepend-icon="mdi-script-text"
        title="Quản lý hóa đơn"
        :to="'/receipt'"
      />
      <v-list-item
        prepend-icon="mdi-hammer-wrench"
        title="Báo cáo sự cố"
        :to="'/report'"
      />
      <v-list-item
        prepend-icon="mdi-message-processing"
        title="Ý kiến phản hồi"
        :to="'/feedback'"
      />
      <v-list-item
        prepend-icon="mdi-cog"
        title="Đổi mật khẩu"
        :to="'/feedback'"
      />
    </v-list>

    <template #append>
      <v-list nav>
        <v-list-item
          prepend-icon="mdi-logout"
          title="Logout"
          value="logout"
          @click="onLogout"
        />
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<style scoped>
.glass-card {
  backdrop-filter: blur(15px);
  background: rgba(255, 255, 255, 0.2);
}
</style>
