export declare const auditLogRepository: {
    create(data: {
        applicationId: string;
        userId: string;
        action: string;
        details?: string;
    }): import("@prisma/client").Prisma.Prisma__AuditLogClient<{
        id: string;
        createdAt: Date;
        userId: string;
        applicationId: string;
        action: string;
        details: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findByApplicationId(applicationId: string): import("@prisma/client").Prisma.PrismaPromise<({
        user: {
            fullName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        applicationId: string;
        action: string;
        details: string | null;
    })[]>;
};
//# sourceMappingURL=audit-log.repository.d.ts.map