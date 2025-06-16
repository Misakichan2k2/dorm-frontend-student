import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/Home/HomePage.vue";
import RoutesAuth from "@/views/Auth/service/routes";
import RoutesRoomRegistration from "@/views/RoomRegistration/service/routes";
import RoutesProfile from "@/views/Profile/service/routes";
import RoutesRoomInfo from "@/views/RoomInfo/service/routes";
import RoutesReceipt from "@/views/Receipt/service/routes";
import RoutesReport from "@/views/Report/service/routes";
import RoutesFeedback from "@/views/Feedback/service/routes";
import RoutesPayment from "@/views/Payment/service/routes";
import { appLocalStorage } from "@/utils";

const routes = [
  { path: "/", redirect: "/profile" },
  ...RoutesAuth,
  ...RoutesRoomRegistration,
  ...RoutesProfile,
  ...RoutesRoomInfo,
  ...RoutesReceipt,
  ...RoutesReport,
  ...RoutesFeedback,
  ...RoutesPayment,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const publicPage = to.meta.publicPage;

  if (!appLocalStorage.value.accessToken && !publicPage) {
    return next({ name: "SignIn" });
  }

  if (
    appLocalStorage.value.accessToken &&
    ["SignIn", "SignUp"].includes(to.name)
  ) {
    return next({ name: "HomePage" });
  }

  next();
});

export default router;
