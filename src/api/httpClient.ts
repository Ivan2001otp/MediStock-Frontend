import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../models/auth";
import axios from "axios";
import type { HospitalOnBoardResponse, HospitalPayload, VendorModel, VendorOnBoardResponse } from "../models/onboard";

const BASE_URL = "http://localhost:8080/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Request interceptor to attach access_tokens
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("interceptor-request-config loading access-token");
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.log("interceptor-request-error ", error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 and refresh
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("status inside interceptor : ", response.status);
    return response;
  },
  async (error) => {
    console.log("interceptor-response-use : ", error);
    console.log("interceptor-response-use-status : ", error.response?.status);
    const originalRequest = error.config;

    // handle 200, 403, 500
    // check the status provided my middleware

    // access-token has expired,
    if (error.response?.status === 404) {
      window.location.href = "/not_found";
      originalRequest._retry = false;
    }

    else if (error.response?.status === 403 || error.response?.status === 401) {
      originalRequest._retry = true;

      const r_token = localStorage.getItem("refresh_token");
      if (r_token) {
        try {
          const payload = {
            refresh_token: r_token,
          };

          const res = await axiosInstance.post("/refresh-token", payload);

          console.log(res);
          // if status is 200 ,set the new access-token
          // here the refresh token has not yet expired
          const newAccessToken = res.data["data"]["access_token"];
          console.log("New A-token : ", newAccessToken);
          localStorage.setItem("access_token", newAccessToken);

          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (error) {
          // here the refresh token has expired
          console.log("interceptor-response-use error is  : ", error);
          localStorage.clear();
          window.location.href = "/login";
          return Promise.reject(error);
        }
      }

    }
  }
);

/* api for onboarding vendor
{
  "name": "Cyprus Pharmacuticals",
  "contact_person": "Garry Shastri",
  "phone": "+91-9440321288",
  "email":"cyprus.pharmacy@supplier.com",
  "address":"West world, Germany",
  "overall_quality_rating":4.6,
  "avg_delivery_time":5
}
*/
export const onBoardVendor = async (
  vendorDetails: VendorModel
): Promise<ApiResponse<VendorOnBoardResponse>> => {
  const response = await axiosInstance.post<ApiResponse<VendorOnBoardResponse>>(
    `${BASE_URL}/vendors`,
    vendorDetails
  );

  return response.data;
};


export const onBoardHospital = async (
  payload: HospitalPayload
): Promise<HospitalOnBoardResponse> => {
  const response = await axiosInstance.post<HospitalOnBoardResponse>(
    `${BASE_URL}/hospital-client`, payload
  );

  return response.data;
}



/* api for register
{
    "email":"abc@gmail.com",
    "password":"1233"
}
*/
export const registerUser = async (
  credentials: RegisterRequest
): Promise<RegisterResponse> => {
  const response = await axiosInstance.post<RegisterResponse>(
    `${BASE_URL}/register`,
    credentials
  );
  return response.data;
};



/* api for login 
{
    "email":"abc@gmail.com",
    "password":"123"
}
*/
export const loginUser = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    `${BASE_URL}/login`,
    credentials
  );

  return response.data;
};
