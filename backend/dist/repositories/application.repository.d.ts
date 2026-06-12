export declare const applicationRepository: {
    findById(id: string): import("@prisma/client").Prisma.Prisma__ApplicationClient<({
        user: {
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
        };
        attachments: {
            id: string;
            createdAt: Date;
            applicationId: string;
            publicId: string;
            url: string;
            fileName: string;
            size: number;
            mimeType: string;
        }[];
        statusHistory: {
            id: string;
            createdAt: Date;
            oldStatus: string | null;
            newStatus: string;
            applicationId: string;
            changedById: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        referenceNumber: string;
        applicationSource: string;
        applicantName: string;
        fatherName: string;
        category: string;
        subject: string;
        description: string | null;
        villageMohalla: string;
        panchayat: string | null;
        policeStation: string | null;
        assemblyConstituency: string | null;
        block: string;
        district: string;
        pincode: string | null;
        department: string;
        status: string;
        adminRemarks: string | null;
        internalNotes: string | null;
        userId: string;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findByReferenceNumber(refNo: string): import("@prisma/client").Prisma.Prisma__ApplicationClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        referenceNumber: string;
        applicationSource: string;
        applicantName: string;
        fatherName: string;
        category: string;
        subject: string;
        description: string | null;
        villageMohalla: string;
        panchayat: string | null;
        policeStation: string | null;
        assemblyConstituency: string | null;
        block: string;
        district: string;
        pincode: string | null;
        department: string;
        status: string;
        adminRemarks: string | null;
        internalNotes: string | null;
        userId: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
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
    }): import("@prisma/client").Prisma.PrismaPromise<({
        user: {
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
        };
        attachments: {
            id: string;
            createdAt: Date;
            applicationId: string;
            publicId: string;
            url: string;
            fileName: string;
            size: number;
            mimeType: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        referenceNumber: string;
        applicationSource: string;
        applicantName: string;
        fatherName: string;
        category: string;
        subject: string;
        description: string | null;
        villageMohalla: string;
        panchayat: string | null;
        policeStation: string | null;
        assemblyConstituency: string | null;
        block: string;
        district: string;
        pincode: string | null;
        department: string;
        status: string;
        adminRemarks: string | null;
        internalNotes: string | null;
        userId: string;
    })[]>;
    count(params: {
        search?: string;
        category?: string;
        status?: string;
        department?: string;
        district?: string;
        userId?: string;
    }): import("@prisma/client").Prisma.PrismaPromise<number>;
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
    }): import("@prisma/client").Prisma.Prisma__ApplicationClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        referenceNumber: string;
        applicationSource: string;
        applicantName: string;
        fatherName: string;
        category: string;
        subject: string;
        description: string | null;
        villageMohalla: string;
        panchayat: string | null;
        policeStation: string | null;
        assemblyConstituency: string | null;
        block: string;
        district: string;
        pincode: string | null;
        department: string;
        status: string;
        adminRemarks: string | null;
        internalNotes: string | null;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: Partial<{
        status: string;
        department: string;
        adminRemarks: string;
        internalNotes: string;
    }>): import("@prisma/client").Prisma.Prisma__ApplicationClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        referenceNumber: string;
        applicationSource: string;
        applicantName: string;
        fatherName: string;
        category: string;
        subject: string;
        description: string | null;
        villageMohalla: string;
        panchayat: string | null;
        policeStation: string | null;
        assemblyConstituency: string | null;
        block: string;
        district: string;
        pincode: string | null;
        department: string;
        status: string;
        adminRemarks: string | null;
        internalNotes: string | null;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findByUserId(userId: string): import("@prisma/client").Prisma.PrismaPromise<({
        attachments: {
            id: string;
            createdAt: Date;
            applicationId: string;
            publicId: string;
            url: string;
            fileName: string;
            size: number;
            mimeType: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        referenceNumber: string;
        applicationSource: string;
        applicantName: string;
        fatherName: string;
        category: string;
        subject: string;
        description: string | null;
        villageMohalla: string;
        panchayat: string | null;
        policeStation: string | null;
        assemblyConstituency: string | null;
        block: string;
        district: string;
        pincode: string | null;
        department: string;
        status: string;
        adminRemarks: string | null;
        internalNotes: string | null;
        userId: string;
    })[]>;
    getStatsByUserId(userId: string, since: Date): Promise<{
        total: number;
        pending: number;
        resolved: number;
        closed: number;
        categoryDistribution: {
            name: string;
            value: number;
        }[];
        statusDistribution: {
            name: string;
            value: number;
        }[];
    }>;
    getAdminStats(since?: Date): Promise<{
        total: number;
        pending: number;
        resolved: number;
        closed: number;
        categoryDistribution: {
            name: string;
            value: number;
        }[];
        departmentPendency: {
            department: string;
            pending: number;
            resolved: number;
        }[];
        districtAnalysis: {
            district: string;
            count: number;
        }[];
        monthlyTrend: {
            month: string;
            count: number;
        }[];
    }>;
};
//# sourceMappingURL=application.repository.d.ts.map