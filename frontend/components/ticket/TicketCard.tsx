"use client";

import {
  Calendar,
  Eye,
  Pencil,
  Trash2,
  AlertCircle,
  Clock3,
  CheckCircle2,
  Flag,
} from "lucide-react";

import { Ticket } from "@/types/models/ticket";
import Link from "next/link";

interface TicketCardProps {
  ticket: Ticket;
  onEdit: (ticket: Ticket) => void;
  onDelete: (ticket: Ticket) => void;
}

export default function TicketCard({
  ticket,
  onEdit,
  onDelete,
}: TicketCardProps) {
  const statusStyle = {
    Open: "bg-green-100 text-green-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    Closed: "bg-gray-200 text-gray-700",
  };

  const priorityStyle = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-blue-100 text-blue-700",
  };

  const StatusIcon = () => {
    switch (ticket.status) {
      case "Open":
        return <AlertCircle size={14} />;
      case "In Progress":
        return <Clock3 size={14} />;
      case "Closed":
        return <CheckCircle2 size={14} />;
      default:
        return <AlertCircle size={14} />;
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {ticket.title}
          </h2>

          <p className="mt-2 max-w-2xl text-gray-500">
            {ticket.description}
          </p>
        </div>

        <span
          className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${
            statusStyle[
              ticket.status as keyof typeof statusStyle
            ]
          }`}
        >
          <StatusIcon />
          {ticket.status}
        </span>
      </div>

      {/* Footer */}
      <div className="mt-6 flex flex-col gap-4 border-t pt-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <span
            className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${
              priorityStyle[
                ticket.priority as keyof typeof priorityStyle
              ]
            }`}
          >
            <Flag size={14} />
            {ticket.priority}
          </span>

          <span className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar size={15} />
            {new Date(ticket.created_at).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/customer/tickets/${ticket.id}`}
            className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition hover:bg-gray-100"
          >
            <Eye size={16} />
            View
          </Link>

          <button
            onClick={() => onEdit(ticket)}
            className="flex items-center gap-2 rounded-lg border border-blue-500 px-4 py-2 text-sm text-blue-600 transition hover:bg-blue-50"
          >
            <Pencil size={16} />
            Edit
          </button> 

          <button
            onClick={() => onDelete(ticket)}
            className="flex items-center gap-2 rounded-lg border border-red-500 px-4 py-2 text-sm text-red-600 transition hover:bg-red-50"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}