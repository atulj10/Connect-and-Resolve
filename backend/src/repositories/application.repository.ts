import { prisma } from "../lib/prisma.js";

export const applicationRepository = {
  findById(id: string) {
    return prisma.application.findUnique({
      where: { id },
      include: { attachments: true, statusHistory: { orderBy: { createdAt: "desc" } }, user: true },
    });
  },

  findByReferenceNumber(refNo: string) {
    return prisma.application.findUnique({ where: { referenceNumber: refNo } });
  },

  findMany(params: {
    skip?: number;
    take?: number;
    search?: string;
    category?: string;
    status?: string;
    department?: string;
    district?: string;
    userId?: string;
    orderBy?: "createdAt" | "updatedAt";
    orderDir?: "asc" | "desc";
  }) {
    const { skip = 0, take = 10, search, category, status, department, district, userId, orderBy = "createdAt", orderDir = "desc" } = params;
    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [
        { referenceNumber: { contains: search } },
        { subject: { contains: search } },
        { applicantName: { contains: search } },
      ];
    }
    if (category) where.category = category;
    if (status) where.status = status;
    if (department) where.department = department;
    if (district) where.district = district;
    if (userId) where.userId = userId;

    return prisma.application.findMany({
      where: where as any,
      skip,
      take,
      orderBy: { [orderBy]: orderDir },
      include: { attachments: true, user: true },
    });
  },

  count(params: {
    search?: string;
    category?: string;
    status?: string;
    department?: string;
    district?: string;
    userId?: string;
  }) {
    const { search, category, status, department, district, userId } = params;
    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [
        { referenceNumber: { contains: search } },
        { subject: { contains: search } },
        { applicantName: { contains: search } },
      ];
    }
    if (category) where.category = category;
    if (status) where.status = status;
    if (department) where.department = department;
    if (district) where.district = district;
    if (userId) where.userId = userId;
    return prisma.application.count({ where: where as any });
  },

  create(data: {
    referenceNumber: string;
    applicationSource: string;
    applicantName: string;
    fatherName: string;
    category: string;
    subject: string;
    description?: string;
    villageMohalla: string;
    panchayat?: string;
    policeStation?: string;
    assemblyConstituency?: string;
    block: string;
    district: string;
    pincode?: string;
    department: string;
    userId: string;
  }) {
    return prisma.application.create({
      data: {
        ...data,
        status: "Submitted",
      },
    });
  },

  update(id: string, data: Partial<{ status: string; department: string; adminRemarks: string; internalNotes: string }>) {
    return prisma.application.update({ where: { id }, data });
  },

  findByUserId(userId: string) {
    return prisma.application.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { attachments: true },
    });
  },

  async getStatsByUserId(userId: string, since: Date) {
    const where = { userId, createdAt: { gte: since } };
    const all = await prisma.application.findMany({ where: where as any, select: { status: true, category: true } });
    const total = all.length;
    const pending = all.filter((a) => ["Submitted", "Under Review", "Forwarded to Department", "In Process", "Action Taken"].includes(a.status)).length;
    const resolved = all.filter((a) => a.status === "Resolved").length;
    const closed = all.filter((a) => a.status === "Closed").length;

    const categoryMap = new Map<string, number>();
    const statusMap = new Map<string, number>();
    all.forEach((a) => {
      categoryMap.set(a.category, (categoryMap.get(a.category) ?? 0) + 1);
      statusMap.set(a.status, (statusMap.get(a.status) ?? 0) + 1);
    });

    return {
      total,
      pending,
      resolved,
      closed,
      categoryDistribution: Array.from(categoryMap.entries()).map(([name, value]) => ({ name, value })),
      statusDistribution: Array.from(statusMap.entries()).map(([name, value]) => ({ name, value })),
    };
  },

  async getAdminStats(since?: Date) {
    const where: Record<string, unknown> = {};
    if (since) where.createdAt = { gte: since };
    const all = await prisma.application.findMany({ where: where as any, select: { status: true, category: true, department: true, district: true, createdAt: true } });

    const total = all.length;
    const pending = all.filter((a) => ["Submitted", "Under Review", "Forwarded to Department", "In Process", "Action Taken"].includes(a.status)).length;
    const resolved = all.filter((a) => ["Resolved", "Closed"].includes(a.status)).length;

    const categoryMap = new Map<string, number>();
    const departmentPending = new Map<string, number>();
    const departmentResolved = new Map<string, number>();
    const districtMap = new Map<string, number>();
    const monthlyMap = new Map<string, number>();

    all.forEach((a) => {
      categoryMap.set(a.category, (categoryMap.get(a.category) ?? 0) + 1);
      districtMap.set(a.district, (districtMap.get(a.district) ?? 0) + 1);
      if (["Submitted", "Under Review", "Forwarded to Department", "In Process", "Action Taken"].includes(a.status)) {
        departmentPending.set(a.department, (departmentPending.get(a.department) ?? 0) + 1);
      }
      if (["Resolved", "Closed"].includes(a.status)) {
        departmentResolved.set(a.department, (departmentResolved.get(a.department) ?? 0) + 1);
      }
      const m = new Date(a.createdAt).toLocaleString("en-US", { month: "short", year: "numeric" });
      monthlyMap.set(m, (monthlyMap.get(m) ?? 0) + 1);
    });

    return {
      total,
      pending,
      resolved,
      closed: all.filter((a) => a.status === "Closed").length,
      categoryDistribution: Array.from(categoryMap.entries()).map(([n, v]) => ({ name: n, value: v })),
      departmentPendency: Array.from(new Set([...departmentPending.keys(), ...departmentResolved.keys()])).map((d) => ({
        department: d,
        pending: departmentPending.get(d) ?? 0,
        resolved: departmentResolved.get(d) ?? 0,
      })),
      districtAnalysis: Array.from(districtMap.entries()).map(([n, v]) => ({ district: n, count: v })),
      monthlyTrend: Array.from(monthlyMap.entries()).map(([m, c]) => ({ month: m, count: c })),
    };
  },
};
