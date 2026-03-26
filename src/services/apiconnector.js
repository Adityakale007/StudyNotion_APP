import axios from "axios";

// Detect environment
const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:4000/api/v1"
    : "https://studynotion-backend-8bx4.onrender.com/api/v1";

// Axios instance
export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    
});

// API connector
export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method: method,
        url: url,
        data: bodyData || null,
        headers: headers || {},
        params: params || {},
    });
};