import { z } from "zod";
export const CATEGORIES = [
    "Application (आवेदन)",
    "Grievance (परिवाद)",
    "Complaint (शिकायत)",
    "Suggestion (सुझाव)",
    "Others (अन्य)",
];
export const DEPARTMENTS = [
    "Public Works",
    "Water Resources",
    "Electricity Board",
    "Municipal Corporation",
    "Health Department",
    "Education Department",
    "Police Department",
    "Revenue Department",
];
export const STATUSES = [
    "Submitted",
    "In Process",
    "Resolved",
    "Rejected",
];
export const APPLICATION_SOURCES = ["CITIZEN", "ADMIN"];
export const OTP_PURPOSES = ["REGISTER", "LOGIN"];
// Validation schemas
export const registerSchema = z.object({
    fullName: z.string().min(1, "Full name is required").max(80),
    mobileNumber: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit mobile number"),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
});
export const sendOtpSchema = z.object({
    identifier: z.string().min(1, "Mobile or email is required"),
    purpose: z.enum(["REGISTER", "LOGIN"]),
});
export const verifyOtpSchema = z.object({
    identifier: z.string().min(1),
    code: z.string().length(6, "OTP must be 6 digits"),
    purpose: z.enum(["REGISTER", "LOGIN"]),
});
export const verifyOtpRegisterSchema = verifyOtpSchema.extend({
    fullName: z.string().min(1, "Full name is required").max(80),
    mobileNumber: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit mobile number").optional().or(z.literal("")),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
});
export const loginSchema = z.object({
    identifier: z.string().min(1, "Mobile or email is required"),
    code: z.string().length(6, "OTP must be 6 digits"),
});
export const adminLoginSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});
export const createApplicationSchema = z.object({
    applicantName: z.string().min(1, "Applicant name is required").max(80),
    fatherName: z.string().min(1, "Father's name is required").max(80),
    subject: z.string().min(5, "Subject must be at least 5 characters").max(120),
    category: z.enum(CATEGORIES),
    description: z.string().max(1000).optional().or(z.literal("")),
    villageMohalla: z.string().min(1, "Village/Mohalla is required").max(100),
    panchayat: z.string().max(100).optional().or(z.literal("")),
    policeStation: z.string().max(100).optional().or(z.literal("")),
    assemblyConstituency: z.string().max(100).optional().or(z.literal("")),
    block: z.string().min(1, "Block is required").max(100),
    district: z.string().min(1, "District is required").max(100),
    pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode").optional().or(z.literal("")),
    department: z.string().optional(),
    // Admin-only: link to existing user
    mobileNumber: z.string().regex(/^\d{10}$/).optional(),
});
export const updateStatusSchema = z.object({
    status: z.enum(STATUSES),
});
export const updateDepartmentSchema = z.object({
    department: z.enum(DEPARTMENTS),
});
export const addRemarksSchema = z.object({
    adminRemarks: z.string().max(1000).optional().or(z.literal("")),
    internalNotes: z.string().max(1000).optional().or(z.literal("")),
});
export const applicationQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    pageSize: z.coerce.number().int().positive().max(100).default(10),
    search: z.string().optional(),
    category: z.string().optional(),
    status: z.string().optional(),
    department: z.string().optional(),
    district: z.string().optional(),
});
export const analyticsQuerySchema = z.object({
    range: z.enum(["week", "month", "year"]).optional().default("year"),
});
export const adminAnalyticsQuerySchema = z.object({
    range: z.enum(["today", "7days", "30days", "year"]).optional().default("year"),
});
//# sourceMappingURL=index.js.map