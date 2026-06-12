import { b as apiClient } from "./auth-DbCn25DT.mjs";
const analyticsApi = {
  citizen(range = "year") {
    return apiClient.get("/analytics/citizen", { params: { range } }).then((r) => r.data);
  },
  admin(range = "year") {
    return apiClient.get("/analytics/admin", { params: { range } }).then((r) => r.data);
  }
};
export {
  analyticsApi as a
};
