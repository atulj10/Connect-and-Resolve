import type { UserRole } from "../types/index.js";
export declare const userRepository: {
    findById(id: string): import("@prisma/client").Prisma.Prisma__UserClient<{
        fullName: string;
        mobileNumber: string | null;
        email: string | null;
        password: string | null;
        id: string;
        role: string;
        mobileVerified: boolean;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findByMobile(mobileNumber: string): import("@prisma/client").Prisma.Prisma__UserClient<{
        fullName: string;
        mobileNumber: string | null;
        email: string | null;
        password: string | null;
        id: string;
        role: string;
        mobileVerified: boolean;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findByEmail(email: string): import("@prisma/client").Prisma.Prisma__UserClient<{
        fullName: string;
        mobileNumber: string | null;
        email: string | null;
        password: string | null;
        id: string;
        role: string;
        mobileVerified: boolean;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(skip?: number, take?: number): import("@prisma/client").Prisma.PrismaPromise<{
        fullName: string;
        mobileNumber: string | null;
        email: string | null;
        password: string | null;
        id: string;
        role: string;
        mobileVerified: boolean;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    countAll(): import("@prisma/client").Prisma.PrismaPromise<number>;
    search(query: string): import("@prisma/client").Prisma.PrismaPromise<{
        fullName: string;
        mobileNumber: string | null;
        email: string | null;
        password: string | null;
        id: string;
        role: string;
        mobileVerified: boolean;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(data: {
        fullName: string;
        mobileNumber?: string;
        email?: string;
        role: UserRole;
        mobileVerified?: boolean;
        emailVerified?: boolean;
        password?: string;
    }): import("@prisma/client").Prisma.Prisma__UserClient<{
        fullName: string;
        mobileNumber: string | null;
        email: string | null;
        password: string | null;
        id: string;
        role: string;
        mobileVerified: boolean;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: Partial<{
        fullName: string;
        email: string;
        mobileVerified: boolean;
        emailVerified: boolean;
        password: string;
    }>): import("@prisma/client").Prisma.Prisma__UserClient<{
        fullName: string;
        mobileNumber: string | null;
        email: string | null;
        password: string | null;
        id: string;
        role: string;
        mobileVerified: boolean;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
};
//# sourceMappingURL=user.repository.d.ts.map