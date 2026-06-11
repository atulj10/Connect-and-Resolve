export declare const userService: {
    list(page: number, pageSize: number): Promise<{
        users: {
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
        }[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    }>;
    search(query: string): Promise<{
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
    getById(id: string): Promise<{
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
    }>;
};
//# sourceMappingURL=user.service.d.ts.map