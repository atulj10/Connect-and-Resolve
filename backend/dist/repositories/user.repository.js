import { prisma } from "../lib/prisma.js";
export const userRepository = {
    findById(id) {
        return prisma.user.findUnique({ where: { id } });
    },
    findByMobile(mobileNumber) {
        return prisma.user.findUnique({ where: { mobileNumber } });
    },
    findByEmail(email) {
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
    search(query) {
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
    create(data) {
        return prisma.user.create({ data });
    },
    update(id, data) {
        return prisma.user.update({ where: { id }, data });
    },
};
//# sourceMappingURL=user.repository.js.map