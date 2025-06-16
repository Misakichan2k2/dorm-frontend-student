export default [
  {
    path: "/sign-in",
    name: "SignIn",
    meta: { publicPage: true },
    component: () => import("../SignIn.vue"),
  },
  {
    path: "/sign-up",
    name: "SignUp",
    meta: { publicPage: true },
    component: () => import("../SignUp.vue"),
  },
  {
    path: "/change-password",
    name: "ChangePassword",
    meta: { publicPage: true },
    component: () => import("../ChangePassword.vue"),
  },
];
