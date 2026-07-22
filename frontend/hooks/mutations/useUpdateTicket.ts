"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ticketService } from "@/services/api/ticket.service";
import { CreateTicketRequest } from "@/types/models/ticket";

interface UpdateTicketPayload {
  id: number;
  data: CreateTicketRequest;
}

export function useUpdateTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateTicketPayload) =>
      ticketService.updateTicket(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tickets"],
      });

      queryClient.invalidateQueries({
        queryKey: ["ticket", variables.id],
      });
    },

    onError: (error) => {
      console.error("Update Ticket Error:", error);
    },
  });
}