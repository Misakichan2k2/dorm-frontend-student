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

const routes = [
  { path: "/", name: "HomePage", component: HomePage },
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

export default router;
