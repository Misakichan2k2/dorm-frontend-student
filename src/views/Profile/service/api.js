import { AxiosInstance } from "@/services/api";

class ApiStudentProfile {
  getMyProfileRegistration = async () => {
    return await AxiosInstance({
      method: "GET",
      url: "registration/me",
    });
  };
}

export const API_STUDENT_PROFILE = new ApiStudentProfile();
