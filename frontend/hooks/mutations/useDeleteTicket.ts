"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ticketService } from "@/services/api/ticket.service";

export function useDeleteTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      ticketService.deleteTicket(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tickets"],
      });
    },

    onError: (error) => {
      console.error("Delete Ticket Error:", error);
    },
  });
}