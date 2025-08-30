export interface User {
  id: string;
  [key: string]: any;
}

export interface ServiceResult<T = any> {
  success: boolean;
  data: T | null;
  message: string;
}

export interface GetUsersOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  filters?: Record<string, string>;
}