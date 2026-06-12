import { i as isAxiosError, a as axios } from "../_libs/axios.mjs";
function getApiError(err, fallback = "An error occurred") {
  if (isAxiosError(err)) {
    return err.response?.data?.error || err.message || fallback;
  }
  if (err instanceof Error) return err.message;
  return fallback;
}
const API_BASE = "http://localhost:4000/api";
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 3e4
});
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (window.location.pathname !== "/login" && window.location.pathname !== "/admin/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
function getStoredUser() {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function setStoredUser(user, token) {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
}
function clearStoredAuth() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}
export {
  getStoredUser as a,
  apiClient as b,
  clearStoredAuth as c,
  getApiError as g,
  setStoredUser as s
};
