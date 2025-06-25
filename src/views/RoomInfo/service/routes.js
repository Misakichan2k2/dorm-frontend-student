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
  {
    path: "/room-info/room-transfer/:id",
    name: "TransferRoom",
    component: () => import("../components/TransferRoom.vue"),
  },
];
