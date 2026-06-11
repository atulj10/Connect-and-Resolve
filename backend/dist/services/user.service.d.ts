export declare const userService: {
    list(page: number, pageSize: number): Promise<{
        users: {
            id: string;
            mobileNumber: string | null;
            email: string | null;
            fullName: string;
            password: string | null;
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
        id: string;
        mobileNumber: string | null;
        email: string | null;
        fullName: string;
        password: string | null;
        role: string;
        mobileVerified: boolean;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getById(id: string): Promise<{
        id: string;
        mobileNumber: string | null;
        email: string | null;
        fullName: string;
        password: string | null;
        role: string;
        mobileVerified: boolean;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map