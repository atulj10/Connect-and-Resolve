import { prisma } from "../lib/prisma.js";
import type { UserRole } from "../types/index.js";

export const userRepository = {
  findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },

  findByMobile(mobileNumber: string) {
    return prisma.user.findUnique({ where: { mobileNumber } });
  },

  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  findAll(skip = 0, take = 10) {
    return prisma.user.findMany({
      skip,
      take,
      orderBy: { createdAt: "desc" },
    });
  },

  countAll() {
    return prisma.user.count();
  },

  search(query: string) {
    return prisma.user.findMany({
      where: {
        OR: [
          { fullName: { contains: query } },
          { mobileNumber: { contains: query } },
          { email: { contains: query } },
        ],
      },
      take: 20,
      orderBy: { createdAt: "desc" },
    });
  },

  create(data: {
    fullName: string;
    mobileNumber?: string;
    email?: string;
    role: UserRole;
    mobileVerified?: boolean;
    emailVerified?: boolean;
    password?: string;
  }) {
    return prisma.user.create({ data });
  },

  update(
    id: string,
    data: Partial<{
      fullName: string;
      email: string;
      mobileVerified: boolean;
      emailVerified: boolean;
      password: string;
    }>,
  ) {
    return prisma.user.update({ where: { id }, data });
  },
};
