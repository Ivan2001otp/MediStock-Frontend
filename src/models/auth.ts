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
    actor: string;
    email: string;
  };
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  payload: T;
}


export interface SupplyItem {
  id: string;
  name: string;
  sku: string;
  unit_of_measure: string;
  category: string;
  is_vital: boolean;
  created_at: string;
  updated_at: string;
}


// this model is used to insert supply as a vendor.
export interface InsertSupplyPayload {
  name: string;
  sku: string;
  unit_of_measure: string;
  category: string;
  is_vital: boolean;
}