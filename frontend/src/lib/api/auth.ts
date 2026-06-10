import { apiClient } from "./client";

export interface User {
  id: string;
  fullName: string;
  mobileNumber: string;
  email?: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const authApi = {
  register(data: { fullName: string; mobileNumber: string; email?: string; address?: string }) {
    return apiClient.post<User>("/auth/register", data).then((r) => r.data);
  },

  sendOtp(identifier: string, purpose: "REGISTER" | "LOGIN") {
    return apiClient
      .post<{ message: string }>("/auth/send-otp", { identifier, purpose })
      .then((r) => r.data);
  },

  verifyOtpAndRegister(
    identifier: string,
    code: string,
    data: { fullName: string; mobileNumber: string; email?: string; address?: string },
  ) {
    return apiClient
      .post<AuthResponse>("/auth/verify-otp-register", {
        identifier,
        code,
        purpose: "REGISTER",
        ...data,
      })
      .then((r) => r.data);
  },

  login(identifier: string, code: string) {
    return apiClient.post<AuthResponse>("/auth/login", { identifier, code }).then((r) => r.data);
  },

  adminLogin(email: string, password: string) {
    return apiClient
      .post<AuthResponse>("/auth/admin/login", { email, password })
      .then((r) => r.data);
  },

  getProfile() {
    return apiClient.get<User>("/auth/profile").then((r) => r.data);
  },
};
