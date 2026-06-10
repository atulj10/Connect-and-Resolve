import { apiClient } from "./client";

export interface UserDto {
  id: string;
  fullName: string;
  mobileNumber: string;
  email?: string;
  address?: string;
  role: string;
  mobileVerified: boolean;
  emailVerified: boolean;
  createdAt: string;
}

export interface PaginatedUsers {
  users: UserDto[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const usersApi = {
  list(page = 1, pageSize = 10) {
    return apiClient
      .get<PaginatedUsers>("/users", { params: { page, pageSize } })
      .then((r) => r.data);
  },

  search(q: string) {
    return apiClient.get<UserDto[]>("/users/search", { params: { q } }).then((r) => r.data);
  },

  getById(id: string) {
    return apiClient.get<UserDto>(`/users/${id}`).then((r) => r.data);
  },
};
