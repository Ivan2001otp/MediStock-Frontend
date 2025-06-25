import type { ApiResponse, LoginRequest, LoginResponse } from "../models/auth";
import axios from 'axios'

const BASE_URL = "http://localhost:8080/api/v1";

export const loginUser = async(credentials:LoginRequest) : Promise<ApiResponse<LoginResponse>> => {
    const response = await axios.post<ApiResponse<LoginResponse>>(
        `${BASE_URL}/login`,
        credentials
    );

    return response.data;
};