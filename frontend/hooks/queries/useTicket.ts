"use client";

import { useQuery } from "@tanstack/react-query";
import { ticketService } from "@/services/api/ticket.service";

export function useTicket(id: number) {
  return useQuery({
    queryKey: ["ticket", id],
    
    queryFn: () => ticketService.getTicket(id),
    
    enabled: !!id,
  });
}