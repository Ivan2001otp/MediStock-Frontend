export type Role = 'VENDOR' | 'HOSPITAL';

export interface LoginRequest {
    email: string;
    password: string;
    actor: Role;
}

export interface LoginResponseBase {
    access_token: string;
    refresh_token: string;
    vendor_name: string;
    vendor_email: string;
    vendor_address: string;
    contact: string;
    updated_at: string;
}

export interface VendorLoginResponse extends LoginResponseBase {
    id: number;
    avg_delievery_days: number;
    score: number;
    rating: number;
}

export interface HospitalLoginResponse extends LoginResponseBase {
    id: string;
}

export type LoginResponse = VendorLoginResponse | HospitalLoginResponse;

export interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
}