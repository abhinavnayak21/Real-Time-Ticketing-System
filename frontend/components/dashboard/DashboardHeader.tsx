"use client";

import { Plus } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  onCreateTicket: () => void;
}

export default function DashboardHeader({
  title,
  onCreateTicket,
}: DashboardHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          {title}
        </h1>

        <p className="mt-2 text-gray-500">
          Manage and track your support tickets
        </p>
      </div>

      <button
        onClick={onCreateTicket}
        className="
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-blue-600
          px-6
          py-3
          font-medium
          text-white
          shadow-sm
          transition-all
          duration-200
          hover:bg-blue-700
          hover:shadow-md
          active:scale-95
        "
      >
        <Plus size={18} />
        Create Ticket
      </button>
    </div>
  );
}