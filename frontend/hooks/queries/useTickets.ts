"use client";

import { useQuery } from "@tanstack/react-query";
import {
  ticketService,
  GetTicketsParams,
} from "@/services/api/ticket.service";


export function useTickets({
  page = 1,
  limit = 10,
  search = "",
  status = "",
  priority = "",
}: GetTicketsParams = {}) {
  return useQuery({
    queryKey: [
      "tickets",
      page,
      limit,
      search,
      status,
      priority,
    ],

    queryFn: () =>
      ticketService.getTickets({
        page,
        limit,
        search,
        status,
        priority,
      }),

    staleTime: 1000 * 60 * 5,
  });
}