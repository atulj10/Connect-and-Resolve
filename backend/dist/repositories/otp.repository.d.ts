export declare const otpRepository: {
    create(data: {
        identifier: string;
        code: string;
        purpose: string;
        expiresAt: Date;
    }): import("@prisma/client").Prisma.Prisma__OtpClient<{
        id: string;
        createdAt: Date;
        identifier: string;
        code: string;
        purpose: string;
        expiresAt: Date;
        verified: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findValid(identifier: string, code: string, purpose: string): import("@prisma/client").Prisma.Prisma__OtpClient<{
        id: string;
        createdAt: Date;
        identifier: string;
        code: string;
        purpose: string;
        expiresAt: Date;
        verified: boolean;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    markVerified(id: string): import("@prisma/client").Prisma.Prisma__OtpClient<{
        id: string;
        createdAt: Date;
        identifier: string;
        code: string;
        purpose: string;
        expiresAt: Date;
        verified: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    invalidateByIdentifier(identifier: string, purpose: string): import("@prisma/client").Prisma.PrismaPromise<import("@prisma/client").Prisma.BatchPayload>;
};
//# sourceMappingURL=otp.repository.d.ts.map