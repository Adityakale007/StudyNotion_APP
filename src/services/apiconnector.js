import axios from "axios";

const ENV_BASE_URL = process.env.REACT_APP_BASE_URL
const DEFAULT_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:4000/api/v1"
    : "https://studynotion-backend-8bx4.onrender.com/api/v1"

// Detect environment
const BASE_URL = ENV_BASE_URL || DEFAULT_BASE_URL

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