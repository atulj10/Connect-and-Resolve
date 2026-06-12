import { apiClient } from "./client";

export interface TimelineAttachment {
  id: string;
  url: string;
  fileName: string;
  mimeType: string;
  size: number;
}

export interface TimelineEntry {
  id: string;
  applicationId: string;
  oldStatus: string | null;
  status: string;
  oldDepartment: string | null;
  department: string | null;
  adminRemarks: string | null;
  internalNotes: string | null;
  changedById: string | null;
  changedBy: { id: string; fullName: string; role: string } | null;
  attachments: TimelineAttachment[];
  createdAt: string;
  updatedAt: string;
}

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
  assemblyConstituency?: string;
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
  initialTimelineEntry?: TimelineEntry;
}

export interface ApplicationDetailResponse {
  application: ApplicationDto;
  timeline: TimelineEntry[];
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
    panchayat?: string;
    policeStation?: string;
    assemblyConstituency?: string;
    block: string;
    district: string;
    pincode?: string;
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
    panchayat?: string;
    policeStation?: string;
    assemblyConstituency?: string;
    block: string;
    district: string;
    pincode?: string;
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
    return apiClient
      .get<ApplicationDetailResponse>(`/applications/${id}`)
      .then((r) => r.data);
  },

  updateApplication(id: string, data: {
    status?: string;
    department?: string;
    adminRemarks?: string;
    internalNotes?: string;
  }) {
    return apiClient
      .patch<ApplicationDto>(`/applications/${id}`, data)
      .then((r) => r.data);
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

  uploadAttachment(id: string, file: File, timelineEntryId?: string) {
    const formData = new FormData();
    formData.append("file", file);
    if (timelineEntryId) {
      formData.append("timelineEntryId", timelineEntryId);
    }
    return apiClient.post(`/applications/${id}/attachments`, formData).then((r) => r.data);
  },
};
