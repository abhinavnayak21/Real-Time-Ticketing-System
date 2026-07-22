"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Circle,
  Flag,
  Loader2,
} from "lucide-react";

import { useTicket } from "@/hooks/queries/useTicket";

export default function TicketDetailsPage() {
  const params = useParams();

  const id = Number(params.id);

  const {
    data: ticket,
    isLoading,
    isError,
  } = useTicket(id);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2
          className="animate-spin text-blue-600"
          size={40}
        />
      </div>
    );
  }

  if (isError || !ticket) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-red-600">
          Ticket Not Found
        </h1>

        <Link
          href="/customer"
          className="mt-5 rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl p-8">
        {/* Back Button */}
        <Link
          href="/customer"
          className="mb-8 inline-flex items-center gap-2 text-blue-600 hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        {/* Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900">
            {ticket.title}
          </h1>

          {/* Description */}
          <div className="mt-8">
            <h2 className="mb-3 text-lg font-semibold">
              Description
            </h2>

            <p className="leading-7 text-gray-600">
              {ticket.description}
            </p>
          </div>

          {/* Information */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* Status */}
            <div className="rounded-xl border bg-gray-50 p-5">
              <div className="mb-2 flex items-center gap-2">
                <Circle
                  size={16}
                  className="text-green-600"
                />
                <span className="font-semibold">
                  Status
                </span>
              </div>

              <p className="text-gray-700">
                {ticket.status}
              </p>
            </div>

            {/* Priority */}
            <div className="rounded-xl border bg-gray-50 p-5">
              <div className="mb-2 flex items-center gap-2">
                <Flag
                  size={16}
                  className="text-red-500"
                />
                <span className="font-semibold">
                  Priority
                </span>
              </div>

              <p className="text-gray-700">
                {ticket.priority}
              </p>
            </div>

            {/* Created */}
            <div className="rounded-xl border bg-gray-50 p-5">
              <div className="mb-2 flex items-center gap-2">
                <Calendar
                  size={16}
                  className="text-blue-600"
                />
                <span className="font-semibold">
                  Created
                </span>
              </div>

              <p className="text-gray-700">
                {new Date(
                  ticket.created_at
                ).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}