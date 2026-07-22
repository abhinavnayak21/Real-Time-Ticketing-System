import api from "./client";
import { CreateTicketRequest, Ticket } from "@/types/models/ticket";
import { PaginatedResponse } from "@/types/models/pagination";

export interface GetTicketsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  priority?: string;
}

export const ticketService = {
  getTickets: async (params: GetTicketsParams = {}) => {
  const query: Record<string, string | number> = {};

  if (params.page !== undefined) {
    query.page = params.page;
  }

  if (params.limit !== undefined) {
    query.limit = params.limit;
  }

  if (params.search && params.search.trim() !== "") {
    query.search = params.search;
  }

  if (params.status && params.status !== "") {
    query.status = params.status;
  }

  if (params.priority && params.priority !== "") {
    query.priority = params.priority;
  }

  const response = await api.get("/tickets/", {
    params: query,
  });

  return response.data;
},

  getTicket: async (id: number) => {
    const response = await api.get(`/tickets/${id}`);
    return response.data;
  },

  createTicket: async (data: CreateTicketRequest) => {
    const response = await api.post("/tickets/", data);
    return response.data;
  },

  updateTicket: async (
    id: number, data: CreateTicketRequest) => {
    const response = await api.put(`/tickets/${id}`,data);
    return response.data;
  },

  deleteTicket: async (id: number) => {
    await api.delete(`/tickets/${id}`);
  },
};