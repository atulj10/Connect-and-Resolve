export declare const analyticsService: {
    citizenAnalytics(userId: string, range: string): Promise<{
        total: number;
        pending: number;
        resolved: number;
        closed: number;
        categoryDistribution: {
            name: string;
            value: number;
        }[];
        statusDistribution: {
            name: string;
            value: number;
        }[];
    }>;
    adminAnalytics(range: string): Promise<{
        total: number;
        pending: number;
        resolved: number;
        closed: number;
        categoryDistribution: {
            name: string;
            value: number;
        }[];
        departmentPendency: {
            department: string;
            pending: number;
            resolved: number;
        }[];
        districtAnalysis: {
            district: string;
            count: number;
        }[];
        monthlyTrend: {
            month: string;
            count: number;
        }[];
    }>;
};
//# sourceMappingURL=analytics.service.d.ts.map