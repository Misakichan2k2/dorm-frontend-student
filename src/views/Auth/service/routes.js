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
    component: () => import("../ChangePassword.vue"),
  },
  {
    path: "/verify-email",
    name: "VerifyEmail",
    meta: { publicPage: true },
    component: () => import("../VerifyEmail.vue"),
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    meta: { publicPage: true },
    component: () => import("../ForgetPassword.vue"),
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    meta: { publicPage: true },
    component: () => import("../ResetPassword.vue"),
  },
];
