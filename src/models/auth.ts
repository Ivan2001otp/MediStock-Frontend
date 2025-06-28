export type Role = "VENDOR" | "HOSPITAL";

// model for login-request data
export interface LoginRequest {
  email: string;
  password: string;
  // actor: Role;
}

// model for register-request
export interface RegisterRequest {
  email: string;
  password: string;
  actor: Role;
}

// model for register-response
export interface RegisterResponse {
  status: number;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
  };
}

export interface LoginResponse {
  status: number;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
    actor:string;
    email: string;
  };
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  payload: T;
}
