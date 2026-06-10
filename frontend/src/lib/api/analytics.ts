import { apiClient } from "./client";

export interface CitizenAnalytics {
  total: number;
  pending: number;
  resolved: number;
  closed: number;
  categoryDistribution: Array<{ name: string; value: number }>;
  statusDistribution: Array<{ name: string; value: number }>;
  monthlyTrend?: Array<{ month: string; count: number }>;
}

export interface AdminAnalytics {
  total: number;
  pending: number;
  resolved: number;
  closed: number;
  categoryDistribution: Array<{ name: string; value: number }>;
  departmentPendency: Array<{ department: string; pending: number; resolved: number }>;
  districtAnalysis: Array<{ district: string; count: number }>;
  monthlyTrend: Array<{ month: string; count: number }>;
}

export const analyticsApi = {
  citizen(range = "year") {
    return apiClient
      .get<CitizenAnalytics>("/analytics/citizen", { params: { range } })
      .then((r) => r.data);
  },

  admin(range = "year") {
    return apiClient
      .get<AdminAnalytics>("/analytics/admin", { params: { range } })
      .then((r) => r.data);
  },
};
