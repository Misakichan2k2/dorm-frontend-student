export default [
  {
    path: "/payment-result",
    name: "Payment",
    component: () => import("../Payment.vue"),
  },
  {
    path: "/payment-result-request",
    name: "PaymentRegistration",
    component: () => import("../PaymentRegistration.vue"),
  },
  {
    path: "/payment-result-renewal",
    name: "PaymentRenewal",
    component: () => import("../PaymentRenewal.vue"),
  },
];
