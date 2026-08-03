import { z } from "zod";

export const CATEGORIES = [
  "Grievance (परिवाद)",
  "Suggestion (सुझाव)",
  "Transfer Posting (स्थानांतरण)",
  "Complaint Against Officer (अधिकारी के विरुद्ध शिकायत आवेदन)",
  "Complaint Against Representative (प्रतिनिधि के विरुद्ध शिकायत आवेदन)",
  "General Application (सामान्य आवेदन)",
  "VIP Application (विशेष आवेदन)",
  "New Construction Work Demand (नए निर्माण कार्य हेतु आवेदन)",
  "Others (अन्य)",
] as const;

export const DEPARTMENTS = [
  "Cabinet Secretariat Department",
  "General Administration Department",
  "Home Department",
  "Law Department",
  "Disaster Management Department",
  "Information & Public Relations Department",
  "Parliamentary Affairs Department",
  "Planning & Development Department",
  "Vigilance Department",
  "Office of the Chief Electoral Officer",
  "Finance & Revenue Departments",
  "Finance Department",
  "Commercial Taxes Department",
  "Revenue & Land Reforms Department",
  "Mines & Geology Department",
  "Prohibition, Excise & Registration Department",
  "Transport Department",
  "Education, Health & Human Resources",
  "Education Department",
  "Higher Education Department",
  "Health Department",
  "Science, Technology & Technical Education Department",
  "Youth, Employment & Skill Development Department",
  "Infrastructure & Industrial Development",
  "Building Construction Department",
  "Industries Department",
  "Energy Department",
  "Information Technology Department",
  "Civil Aviation Department",
  "Public Health Engineering Department (PHED)",
  "Road Construction Department",
  "Rural Works Department",
  "Urban Development & Housing Department",
  "Agriculture & Rural Development",
  "Agriculture Department",
  "Animal & Fisheries Resources Department",
  "Cooperative Department",
  "Environment, Forest & Climate Change Department",
  "Food & Consumer Protection Department",
  "Minor Water Resources Department",
  "Panchayati Raj Department",
  "Rural Development Department",
  "Sugarcane Industries Department",
  "Water Resources Department",
  "Social Welfare Departments",
  "Social Welfare Department",
  "Backward Classes & Extremely Backward Classes Welfare Department",
  "Scheduled Castes & Scheduled Tribes Welfare Department",
  "Minority Welfare Department",
  "Labour Resources & Migrant Workers Welfare Department",
  "Tourism, Culture & Sports",
  "Tourism Department",
  "Art, Culture & Youth Department",
  "Sports Department",
  "Other offices / ULBs / Commission / Authority etc",
] as const;

export const STATUSES = [
  "Submitted",
  "In Process",
  "Resolved",
  "Rejected",
] as const;

export const APPLICATION_SOURCES = ["CITIZEN", "ADMIN"] as const;

export const OTP_PURPOSES = ["REGISTER", "LOGIN"] as const;

export type Category = (typeof CATEGORIES)[number];
export type Department = (typeof DEPARTMENTS)[number];
export type AppStatus = (typeof STATUSES)[number];
export type ApplicationSource = (typeof APPLICATION_SOURCES)[number];
export type OtpPurpose = (typeof OTP_PURPOSES)[number];
export type UserRole = "ADMIN" | "CITIZEN";

// Validation schemas

export const registerSchema = z.object({
  fullName: z.string().min(1, "Full name is required").max(80),
  mobileNumber: z
    .string()
    .regex(/^\d{10}$/, "Enter a valid 10-digit mobile number"),
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
  mobileNumber: z
    .string()
    .regex(/^\d{10}$/, "Enter a valid 10-digit mobile number")
    .optional()
    .or(z.literal("")),
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
  subject: z.string().min(5, "Subject must be at least 5 characters").max(250),
  category: z.enum(CATEGORIES),
  description: z.string().max(1000).optional().or(z.literal("")),
  villageMohalla: z.string().min(1, "Village/Mohalla is required").max(100),
  panchayat: z.string().max(100).optional().or(z.literal("")),
  policeStation: z.string().max(100).optional().or(z.literal("")),
  assemblyConstituency: z.string().max(100).optional().or(z.literal("")),
  block: z.string().min(1, "Block is required").max(100),
  district: z.string().min(1, "District is required").max(100),
  pincode: z
    .string()
    .regex(/^\d{6}$/, "Enter a valid 6-digit pincode")
    .optional()
    .or(z.literal("")),
  department: z.string().optional(),
  subDepartment: z.string().optional().or(z.literal("")),
  area: z.string().optional().or(z.literal("")),
  // Admin-only: link to existing user
  mobileNumber: z
    .string()
    .regex(/^\d{10}$/)
    .optional(),
});

export const adminCreateApplicationSchema = z.object({
  applicantName: z.string().min(1, "Applicant name is required").max(80),
  fatherName: z.string().max(80).optional().or(z.literal("")),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(250),
  category: z.enum(CATEGORIES),
  description: z.string().max(1000).optional().or(z.literal("")),
  villageMohalla: z.string().max(100).optional().or(z.literal("")),
  panchayat: z.string().max(100).optional().or(z.literal("")),
  policeStation: z.string().max(100).optional().or(z.literal("")),
  assemblyConstituency: z.string().max(100).optional().or(z.literal("")),
  block: z.string().min(1, "Block is required").max(100),
  district: z.string().min(1, "District is required").max(100),
  pincode: z
    .string()
    .regex(/^\d{6}$/, "Enter a valid 6-digit pincode")
    .optional()
    .or(z.literal("")),
  department: z.string().optional(),
  subDepartment: z.string().optional().or(z.literal("")),
  area: z.string().optional().or(z.literal("")),
  mobileNumber: z
    .string()
    .regex(/^\d{10}$/)
    .optional(),
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

export const updateApplicationSchema = z.object({
  status: z.enum(STATUSES).optional(),
  department: z.enum(DEPARTMENTS).optional(),
  subDepartment: z.string().optional().or(z.literal("")),
  area: z.string().optional().or(z.literal("")),
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
  subDepartment: z.string().optional(),
  area: z.string().optional(),
  district: z.string().optional(),
  block: z.string().optional(),
});

export const analyticsQuerySchema = z.object({
  range: z.enum(["week", "month", "year"]).optional().default("year"),
});

export const adminAnalyticsQuerySchema = z.object({
  range: z
    .enum(["today", "7days", "30days", "year"])
    .optional()
    .default("year"),
});
