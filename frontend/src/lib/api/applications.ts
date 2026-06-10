import { apiClient } from "./client";

export interface ApplicationDto {
  id: string;
  referenceNumber: string;
  applicationSource: string;
  applicantName: string;
  fatherName: string;
  category: string;
  subject: string;
  description?: string;
  villageMohalla: string;
  panchayat: string;
  policeStation: string;
  block: string;
  district: string;
  pincode: string;
  department: string;
  status: string;
  adminRemarks?: string;
  internalNotes?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  attachments?: Array<{
    id: string;
    url: string;
    fileName: string;
    mimeType: string;
    size: number;
  }>;
  user?: { fullName: string; mobileNumber: string; email?: string };
}

export interface PaginatedResponse<T> {
  applications: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApplicationQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string;
  status?: string;
  department?: string;
  district?: string;
}

export const applicationsApi = {
  create(data: {
    applicantName: string;
    fatherName: string;
    category: string;
    subject: string;
    description?: string;
    villageMohalla: string;
    panchayat: string;
    policeStation: string;
    block: string;
    district: string;
    pincode: string;
  }) {
    return apiClient.post<ApplicationDto>("/applications", data).then((r) => r.data);
  },

  createByAdmin(data: {
    applicantName: string;
    fatherName: string;
    category: string;
    subject: string;
    description?: string;
    villageMohalla: string;
    panchayat: string;
    policeStation: string;
    block: string;
    district: string;
    pincode: string;
    mobileNumber: string;
    department?: string;
  }) {
    return apiClient.post<ApplicationDto>("/applications/admin", data).then((r) => r.data);
  },

  list(params: ApplicationQuery = {}) {
    return apiClient
      .get<PaginatedResponse<ApplicationDto>>("/applications", { params })
      .then((r) => r.data);
  },

  getById(id: string) {
    return apiClient.get<ApplicationDto>(`/applications/${id}`).then((r) => r.data);
  },

  updateStatus(id: string, status: string) {
    return apiClient
      .patch<ApplicationDto>(`/applications/${id}/status`, { status })
      .then((r) => r.data);
  },

  updateDepartment(id: string, department: string) {
    return apiClient
      .patch<ApplicationDto>(`/applications/${id}/department`, { department })
      .then((r) => r.data);
  },

  addRemarks(id: string, data: { adminRemarks?: string; internalNotes?: string }) {
    return apiClient.patch<ApplicationDto>(`/applications/${id}/remarks`, data).then((r) => r.data);
  },

  uploadAttachment(id: string, file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient.post(`/applications/${id}/attachments`, formData).then((r) => r.data);
  },
};
