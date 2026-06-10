import { prisma } from "../lib/prisma.js";
export const referenceCounterRepository = {
    async incrementAndGet(year) {
        const counter = await prisma.referenceCounter.upsert({
            where: { year },
            create: { year, count: 1 },
            update: { count: { increment: 1 } },
        });
        return counter.count;
    },
};
//# sourceMappingURL=reference-counter.repository.js.map