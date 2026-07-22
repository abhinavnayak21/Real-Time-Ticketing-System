import api from "./client";
import { LoginRequest, LoginResponse } from "@/types/models/auth";

export const authService = {
  login: async (
    credentials: LoginRequest
  ): Promise<LoginResponse> => {
    const response = await api.post("/users/login", credentials);

    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get("/users/me");

    return response.data;
  },
};