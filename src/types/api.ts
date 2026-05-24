export type ApiResponse = {
  success: boolean;
  status?: number;
  duration?: number;
  headers?: Record<string, string>;
  data?: any;
  error?: string;
};