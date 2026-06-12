import type { Prisma } from "@prisma/client";
export declare const userRepository: {
    findById(id: string): Prisma.Prisma__UserClient<{
        id: string;
        fullName: string;
        mobileNumber: string | null;
        email: string | null;
        password: string | null;
        role: string;
        mobileVerified: boolean;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findByMobile(mobileNumber: string): Prisma.Prisma__UserClient<{
        id: string;
        fullName: string;
        mobileNumber: string | null;
        email: string | null;
        password: string | null;
        role: string;
        mobileVerified: boolean;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findByEmail(email: string): Prisma.Prisma__UserClient<{
        id: string;
        fullName: string;
        mobileNumber: string | null;
        email: string | null;
        password: string | null;
        role: string;
        mobileVerified: boolean;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findAll(skip?: number, take?: number): Prisma.PrismaPromise<{
        id: string;
        fullName: string;
        mobileNumber: string | null;
        email: string | null;
        password: string | null;
        role: string;
        mobileVerified: boolean;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    countAll(): Prisma.PrismaPromise<number>;
    search(query: string): Prisma.PrismaPromise<{
        id: string;
        fullName: string;
        mobileNumber: string | null;
        email: string | null;
        password: string | null;
        role: string;
        mobileVerified: boolean;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(data: Prisma.UserCreateInput): Prisma.Prisma__UserClient<{
        id: string;
        fullName: string;
        mobileNumber: string | null;
        email: string | null;
        password: string | null;
        role: string;
        mobileVerified: boolean;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    update(id: string, data: Partial<{
        fullName: string;
        email: string;
        mobileVerified: boolean;
        emailVerified: boolean;
        password: string;
    }>): Prisma.Prisma__UserClient<{
        id: string;
        fullName: string;
        mobileNumber: string | null;
        email: string | null;
        password: string | null;
        role: string;
        mobileVerified: boolean;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
};
//# sourceMappingURL=user.repository.d.ts.map