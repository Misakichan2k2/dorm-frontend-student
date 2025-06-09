import { defineStore } from "pinia";
import { computed, ref } from "vue";

export * as STORE_AUTH from "@/views/Auth/service/store";
export * as STORE_REGISTRATION from "@/views/RoomRegistration/service/store";
export * as STORE_STUDENT_PROFILE from "@/views/Profile/service/store";
export * as STORE_ROOM_INFO from "@/views/RoomInfo/service/store";
export * as STORE_INVOICE from "@/views/Receipt/service/store";
export * as STORE_REPORT from "@/views/Report/service/store";
export * as STORE_FEEDBACK from "@/views/Feedback/service/store";

export const StoreApp = defineStore("StoreApp", () => {
  const routeSignIn = ref("");
  const isLoading = ref(false);

  const onGetterRouteSignIn = computed(() => routeSignIn);
  const onGetterIsLoading = computed(() => isLoading);

  // Loading
  const onActionIsLoading = (isActive = true) => {
    isLoading.value = isActive;
  };

  return {
    onGetterRouteSignIn,
    onGetterIsLoading,
    onActionIsLoading,
  };
});
