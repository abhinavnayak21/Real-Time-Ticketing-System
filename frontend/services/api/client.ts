import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_DEMO_TOKEN;

  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  return config;
});

export default api;