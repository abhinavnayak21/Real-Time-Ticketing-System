import {
  CheckCircle2,
  Clock3,
  AlertCircle,
  Ticket,
} from "lucide-react";

import { Ticket as TicketType } from "@/types/models/ticket";

interface DashboardStatsProps {
  tickets: TicketType[];
}

export default function DashboardStats({
  tickets,
}: DashboardStatsProps) {
  const total = tickets.length;

  const open = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const inProgress = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const closed = tickets.filter(
    (ticket) => ticket.status === "Closed"
  ).length;

  const cards = [
    {
      title: "Total Tickets",
      value: total,
      icon: Ticket,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Open",
      value: open,
      icon: AlertCircle,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "In Progress",
      value: inProgress,
      icon: Clock3,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Closed",
      value: closed,
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-semibold">
                  {card.value}
                </h2>
              </div>

              <div
                className={`rounded-xl p-3 ${card.color}`}
              >
                <Icon size={26} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}