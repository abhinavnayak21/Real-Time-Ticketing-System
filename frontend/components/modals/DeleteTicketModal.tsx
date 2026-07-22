"use client";

import { X, TriangleAlert } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function DeleteTicketModal({
  open,
  onClose,
  onConfirm,
  loading = false,
}: Props) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={loading ? undefined : onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

          {/* Header */}
          <div className="flex items-center justify-between border-b p-6">
            <div className="flex items-center gap-3">
              <TriangleAlert
                size={22}
                className="text-red-500"
              />

              <h2 className="text-xl font-semibold">
                Delete Ticket
              </h2>
            </div>

            <button
              onClick={onClose}
              disabled={loading}
              className="rounded-lg p-2 hover:bg-gray-100 disabled:opacity-50"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="space-y-4 p-6">
            <p className="text-gray-700">
              Are you sure you want to delete this
              ticket?
            </p>

            <p className="text-sm text-red-600">
              This action cannot be undone.
            </p>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t p-6">

            <button
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border px-5 py-2 hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              disabled={loading}
              className="rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>

          </div>
        </div>
      </div>
    </>
  );
}