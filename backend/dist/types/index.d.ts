import { z } from "zod";
export declare const CATEGORIES: readonly ["Water Supply", "Electricity", "Roads & Infrastructure", "Sanitation", "Healthcare", "Education", "Public Safety", "Revenue"];
export declare const DEPARTMENTS: readonly ["Public Works", "Water Resources", "Electricity Board", "Municipal Corporation", "Health Department", "Education Department", "Police Department", "Revenue Department"];
export declare const STATUSES: readonly ["Submitted", "Under Review", "Forwarded to Department", "In Process", "Action Taken", "Resolved", "Closed"];
export declare const APPLICATION_SOURCES: readonly ["CITIZEN", "ADMIN"];
export declare const OTP_PURPOSES: readonly ["REGISTER", "LOGIN"];
export type Category = (typeof CATEGORIES)[number];
export type Department = (typeof DEPARTMENTS)[number];
export type AppStatus = (typeof STATUSES)[number];
export type ApplicationSource = (typeof APPLICATION_SOURCES)[number];
export type OtpPurpose = (typeof OTP_PURPOSES)[number];
export type UserRole = "ADMIN" | "CITIZEN";
export declare const registerSchema: z.ZodObject<{
    fullName: z.ZodString;
    mobileNumber: z.ZodString;
    email: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
}, "strip", z.ZodTypeAny, {
    mobileNumber: string;
    fullName: string;
    email?: string | undefined;
}, {
    mobileNumber: string;
    fullName: string;
    email?: string | undefined;
}>;
export declare const sendOtpSchema: z.ZodObject<{
    identifier: z.ZodString;
    purpose: z.ZodEnum<["REGISTER", "LOGIN"]>;
}, "strip", z.ZodTypeAny, {
    identifier: string;
    purpose: "REGISTER" | "LOGIN";
}, {
    identifier: string;
    purpose: "REGISTER" | "LOGIN";
}>;
export declare const verifyOtpSchema: z.ZodObject<{
    identifier: z.ZodString;
    code: z.ZodString;
    purpose: z.ZodEnum<["REGISTER", "LOGIN"]>;
}, "strip", z.ZodTypeAny, {
    identifier: string;
    code: string;
    purpose: "REGISTER" | "LOGIN";
}, {
    identifier: string;
    code: string;
    purpose: "REGISTER" | "LOGIN";
}>;
export declare const verifyOtpRegisterSchema: z.ZodObject<{
    identifier: z.ZodString;
    code: z.ZodString;
    purpose: z.ZodEnum<["REGISTER", "LOGIN"]>;
} & {
    fullName: z.ZodString;
    mobileNumber: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    email: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
}, "strip", z.ZodTypeAny, {
    fullName: string;
    identifier: string;
    code: string;
    purpose: "REGISTER" | "LOGIN";
    mobileNumber?: string | undefined;
    email?: string | undefined;
}, {
    fullName: string;
    identifier: string;
    code: string;
    purpose: "REGISTER" | "LOGIN";
    mobileNumber?: string | undefined;
    email?: string | undefined;
}>;
export declare const loginSchema: z.ZodObject<{
    identifier: z.ZodString;
    code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    identifier: string;
    code: string;
}, {
    identifier: string;
    code: string;
}>;
export declare const adminLoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const createApplicationSchema: z.ZodObject<{
    applicantName: z.ZodString;
    fatherName: z.ZodString;
    subject: z.ZodString;
    category: z.ZodEnum<["Water Supply", "Electricity", "Roads & Infrastructure", "Sanitation", "Healthcare", "Education", "Public Safety", "Revenue"]>;
    description: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    villageMohalla: z.ZodString;
    panchayat: z.ZodString;
    policeStation: z.ZodString;
    block: z.ZodString;
    district: z.ZodString;
    pincode: z.ZodString;
    department: z.ZodOptional<z.ZodString>;
    mobileNumber: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    applicantName: string;
    fatherName: string;
    category: "Water Supply" | "Electricity" | "Roads & Infrastructure" | "Sanitation" | "Healthcare" | "Education" | "Public Safety" | "Revenue";
    subject: string;
    villageMohalla: string;
    panchayat: string;
    policeStation: string;
    block: string;
    district: string;
    pincode: string;
    mobileNumber?: string | undefined;
    description?: string | undefined;
    department?: string | undefined;
}, {
    applicantName: string;
    fatherName: string;
    category: "Water Supply" | "Electricity" | "Roads & Infrastructure" | "Sanitation" | "Healthcare" | "Education" | "Public Safety" | "Revenue";
    subject: string;
    villageMohalla: string;
    panchayat: string;
    policeStation: string;
    block: string;
    district: string;
    pincode: string;
    mobileNumber?: string | undefined;
    description?: string | undefined;
    department?: string | undefined;
}>;
export declare const updateStatusSchema: z.ZodObject<{
    status: z.ZodEnum<["Submitted", "Under Review", "Forwarded to Department", "In Process", "Action Taken", "Resolved", "Closed"]>;
}, "strip", z.ZodTypeAny, {
    status: "Submitted" | "Under Review" | "Forwarded to Department" | "In Process" | "Action Taken" | "Resolved" | "Closed";
}, {
    status: "Submitted" | "Under Review" | "Forwarded to Department" | "In Process" | "Action Taken" | "Resolved" | "Closed";
}>;
export declare const updateDepartmentSchema: z.ZodObject<{
    department: z.ZodEnum<["Public Works", "Water Resources", "Electricity Board", "Municipal Corporation", "Health Department", "Education Department", "Police Department", "Revenue Department"]>;
}, "strip", z.ZodTypeAny, {
    department: "Public Works" | "Water Resources" | "Electricity Board" | "Municipal Corporation" | "Health Department" | "Education Department" | "Police Department" | "Revenue Department";
}, {
    department: "Public Works" | "Water Resources" | "Electricity Board" | "Municipal Corporation" | "Health Department" | "Education Department" | "Police Department" | "Revenue Department";
}>;
export declare const addRemarksSchema: z.ZodObject<{
    adminRemarks: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    internalNotes: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
}, "strip", z.ZodTypeAny, {
    adminRemarks?: string | undefined;
    internalNotes?: string | undefined;
}, {
    adminRemarks?: string | undefined;
    internalNotes?: string | undefined;
}>;
export declare const applicationQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    pageSize: z.ZodDefault<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
    department: z.ZodOptional<z.ZodString>;
    district: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    search?: string | undefined;
    category?: string | undefined;
    district?: string | undefined;
    department?: string | undefined;
    status?: string | undefined;
}, {
    search?: string | undefined;
    category?: string | undefined;
    district?: string | undefined;
    department?: string | undefined;
    status?: string | undefined;
    page?: number | undefined;
    pageSize?: number | undefined;
}>;
export declare const analyticsQuerySchema: z.ZodObject<{
    range: z.ZodDefault<z.ZodOptional<z.ZodEnum<["week", "month", "year"]>>>;
}, "strip", z.ZodTypeAny, {
    range: "year" | "week" | "month";
}, {
    range?: "year" | "week" | "month" | undefined;
}>;
export declare const adminAnalyticsQuerySchema: z.ZodObject<{
    range: z.ZodDefault<z.ZodOptional<z.ZodEnum<["today", "7days", "30days", "year"]>>>;
}, "strip", z.ZodTypeAny, {
    range: "year" | "today" | "7days" | "30days";
}, {
    range?: "year" | "today" | "7days" | "30days" | undefined;
}>;
//# sourceMappingURL=index.d.ts.map