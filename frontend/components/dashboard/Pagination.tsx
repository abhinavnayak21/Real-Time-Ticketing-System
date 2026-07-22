"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  total,
  limit,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-between">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="flex items-center gap-2 rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100"
      >
        <ChevronLeft size={18} />
        Previous
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;

          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`h-10 w-10 rounded-lg border transition ${
                page === pageNumber
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="flex items-center gap-2 rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100"
      >
        Next
        <ChevronRight size={18} />
      </button>
    </div>
  );
}