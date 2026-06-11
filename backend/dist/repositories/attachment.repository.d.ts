export declare const attachmentRepository: {
    create(data: {
        publicId: string;
        url: string;
        fileName: string;
        mimeType: string;
        size: number;
        applicationId: string;
    }): import("@prisma/client").Prisma.Prisma__AttachmentClient<{
        id: string;
        createdAt: Date;
        applicationId: string;
        publicId: string;
        url: string;
        fileName: string;
        size: number;
        mimeType: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findByApplicationId(applicationId: string): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        applicationId: string;
        publicId: string;
        url: string;
        fileName: string;
        size: number;
        mimeType: string;
    }[]>;
    delete(id: string): import("@prisma/client").Prisma.Prisma__AttachmentClient<{
        id: string;
        createdAt: Date;
        applicationId: string;
        publicId: string;
        url: string;
        fileName: string;
        size: number;
        mimeType: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
};
//# sourceMappingURL=attachment.repository.d.ts.map