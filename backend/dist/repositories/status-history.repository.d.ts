export declare const statusHistoryRepository: {
    create(data: {
        applicationId: string;
        oldStatus: string | null;
        newStatus: string;
        changedById: string;
    }): import("@prisma/client").Prisma.Prisma__ApplicationStatusHistoryClient<{
        id: string;
        createdAt: Date;
        applicationId: string;
        oldStatus: string | null;
        newStatus: string;
        changedById: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findByApplicationId(applicationId: string): import("@prisma/client").Prisma.PrismaPromise<({
        changedBy: {
            fullName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        applicationId: string;
        oldStatus: string | null;
        newStatus: string;
        changedById: string;
    })[]>;
};
//# sourceMappingURL=status-history.repository.d.ts.map