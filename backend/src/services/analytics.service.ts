import { applicationRepository } from "../repositories/application.repository.js";

function getSince(range: string): Date | undefined {
  const now = Date.now();
  switch (range) {
    case "week": return new Date(now - 7 * 86400000);
    case "month": return new Date(now - 30 * 86400000);
    case "year": return new Date(now - 365 * 86400000);
    default: return undefined;
  }
}

function getAdminSince(range: string): Date | undefined {
  const now = Date.now();
  switch (range) {
    case "today": return new Date(now - 86400000);
    case "7days": return new Date(now - 7 * 86400000);
    case "30days": return new Date(now - 30 * 86400000);
    case "year": return new Date(now - 365 * 86400000);
    default: return undefined;
  }
}

export const analyticsService = {
  async citizenAnalytics(userId: string, range: string) {
    const since = getSince(range);
    return applicationRepository.getStatsByUserId(userId, since ?? new Date(0));
  },

  async adminAnalytics(range: string) {
    const since = getAdminSince(range);
    return applicationRepository.getAdminStats(since ?? undefined);
  },
};
