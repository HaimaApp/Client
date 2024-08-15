import axios from "axios";

export const BASE_URL = "https://ecomapi.techlhab.com";

// Create Axios instance
export const Axios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
