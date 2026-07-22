"use client";

import { Ticket } from "@/types/models/ticket";
import TicketCard from "./TicketCard";

interface Props {
  tickets: Ticket[];
  onEdit: (ticket: Ticket) => void;
  onDelete: (ticket: Ticket) => void;
}


export default function TicketList({
  tickets,
  onEdit,
  onDelete,
}: Props) {

  return (
    <div className="space-y-5">
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          onEdit={onEdit}
          onDelete={onDelete}
        />
        
      ))}
    </div>
    
  );
}