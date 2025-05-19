export interface ApiResponse<T> {
  error?: string;
  status?: number;
  data?: T;
}
