export default [
  {
    path: "/room-info",
    name: "RoomInfo",
    component: () => import("../RoomInfo.vue"),
  },
  {
    path: "/room-info/renew-rental",
    name: "RenewRental",
    component: () => import("../components/Renewal.vue"),
  },
];
