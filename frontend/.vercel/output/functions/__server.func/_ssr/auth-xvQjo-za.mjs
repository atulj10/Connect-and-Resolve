import { b as apiClient } from "./auth-tLLzOFk4.mjs";
const authApi = {
  register(data) {
    return apiClient.post("/auth/register", data).then((r) => r.data);
  },
  sendOtp(identifier, purpose) {
    return apiClient.post("/auth/send-otp", { identifier, purpose }).then((r) => r.data);
  },
  verifyOtpAndRegister(identifier, code, data) {
    return apiClient.post("/auth/verify-otp-register", {
      identifier,
      code,
      purpose: "REGISTER",
      ...data
    }).then((r) => r.data);
  },
  login(identifier, code) {
    return apiClient.post("/auth/login", { identifier, code }).then((r) => r.data);
  },
  adminLogin(email, password) {
    return apiClient.post("/auth/admin/login", { email, password }).then((r) => r.data);
  },
  getProfile() {
    return apiClient.get("/auth/profile").then((r) => r.data);
  }
};
export {
  authApi as a
};
