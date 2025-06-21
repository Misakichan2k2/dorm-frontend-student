import { defineStore } from "pinia";
import { API_AUTH } from "@/services/api";
import { RESPONSE } from "@/utils/response";

export const StoreAuth = defineStore("StoreAuth", () => {
  const { setup } = RESPONSE();
  const API = API_AUTH.API_AUTH;

  // Sign in
  const onActionSignIn = async (data) => {
    return await setup({
      apiFunction: API.signIn(data),
    });
  };

  // Sign up
  const onActionSignUp = async (data) => {
    return await setup({
      apiFunction: API.signUp(data),
    });
  };

  const onActionHasRegistration = async () => {
    return await setup({
      apiFunction: API.hasRegistration(),
    });
  };

  const onActionChangePassword = async (data) => {
    return await setup({
      apiFunction: API.changePassword(data),
    });
  };

  const onActionVerifyEmail = async (token) => {
    return await setup({
      apiFunction: API.verifyEmail(token),
    });
  };

  const onActionForgetPassword = async (email) => {
    return await setup({
      apiFunction: API.forgetPassword(email),
    });
  };

  const onActionResetPassword = async (data) => {
    return await setup({
      apiFunction: API.resetPassword(data),
    });
  };

  return {
    onActionSignIn,
    onActionSignUp,
    onActionHasRegistration,
    onActionChangePassword,
    onActionVerifyEmail,
    onActionForgetPassword,
    onActionResetPassword,
  };
});
