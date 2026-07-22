    "use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ticketService } from "@/services/api/ticket.service";
import { CreateTicketRequest } from "@/types/models/ticket";

export function useCreateTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTicketRequest) =>
      ticketService.createTicket(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tickets"],
      });
    },

    onError: (error) => {
      console.error("Create Ticket Error:", error);
    },
  });
}