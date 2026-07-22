"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { Ticket } from "@/types/models/ticket";
import { useCreateTicket } from "@/hooks/mutations/useCreateTicket";
import { useUpdateTicket } from "@/hooks/mutations/useUpdateTicket";

interface Props {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  ticket: Ticket | null;
}

export default function CreateTicketModal({
  open,
  onClose,
  mode,
  ticket,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  const createTicketMutation = useCreateTicket();
  const updateTicketMutation = useUpdateTicket();

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && ticket) {
      setTitle(ticket.title);
      setDescription(ticket.description);
      setPriority(ticket.priority);
    } else {
      setTitle("");
      setDescription("");
      setPriority("Medium");
    }
  }, [mode, ticket, open]);

  const handleSubmit = () => {
  console.log("1. handleSubmit");

  if (mode === "create") {
    console.log("2. create");

    createTicketMutation.mutate(
      {
        title,
        description,
        priority,
      },
      {
        onSuccess: () => {
          console.log("3. create success");
          onClose();
        },
        onError: (e) => {
          console.log("3. create error", e);
        },
      }
    );
  } else {
    console.log("2. edit");

    if (!ticket) {
      console.log("No ticket");
      return;
    }

    console.log("3. before mutate");

    updateTicketMutation.mutate(
      {
        id: ticket.id,
        data: {
          title,
          description,
          priority,
        },
      },
      {
        onSuccess: () => {
          console.log("4. success");
          onClose();
        },
        onError: (e) => {
          console.log("4. error", e);
        },
      }
    );

    console.log("5. after mutate");
  }
};

  if (!open) return null;

  const isLoading =
    createTicketMutation.isPending ||
    updateTicketMutation.isPending;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-6">
            <h2 className="text-xl font-semibold">
              {mode === "create"
                ? "Create Ticket"
                : "Edit Ticket"}
            </h2>

            <button
              onClick={onClose}
              disabled={isLoading}
              className="rounded-lg p-2 transition hover:bg-gray-100 disabled:opacity-50"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="space-y-5 p-6">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Title
              </label>

              <input
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="Enter ticket title"
                disabled={isLoading}
                className="w-full rounded-xl border p-3 outline-none transition focus:border-blue-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Description
              </label>

              <textarea
                rows={5}
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Describe the issue..."
                disabled={isLoading}
                className="w-full rounded-xl border p-3 outline-none transition focus:border-blue-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Priority
              </label>

              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value)
                }
                disabled={isLoading}
                className="w-full rounded-xl border p-3 outline-none transition focus:border-blue-500 disabled:bg-gray-100"
              >
                <option value="Low">Low</option>
                <option value="Medium">
                  Medium
                </option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t p-6">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="rounded-xl border px-5 py-2 transition hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="rounded-xl bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading
                ? mode === "create"
                  ? "Creating..."
                  : "Updating..."
                : mode === "create"
                ? "Create Ticket"
                : "Update Ticket"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}