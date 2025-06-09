export default [
  {
    path: "/payment-result",
    name: "Payment",
    component: () => import("../Payment.vue"),
  },
  {
    path: "/payment-result-registration",
    name: "PaymentRegistration",
    component: () => import("../PaymentRegistration.vue"),
  },
];
