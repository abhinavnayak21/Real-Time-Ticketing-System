"use client";
import { useEffect } from "react";
import { useState } from "react";

import { useDebounce } from "@/hooks/useDebounce";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import SearchBar from "@/components/dashboard/SearchBar";
import FilterBar from "@/components/dashboard/FilterBar";
import TicketList from "@/components/ticket/TicketList";
import Pagination from "@/components/dashboard/Pagination";
import CreateTicketModal from "@/components/ticket/CreateTicketModal";
import { Ticket } from "@/types/models/ticket";
import DeleteTicketModal from "@/components/modals/DeleteTicketModal";
import { useDeleteTicket } from "@/hooks/mutations/useDeleteTicket";

import { useTickets } from "@/hooks/queries/useTickets";

export default function CustomerPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [ticketToDelete, setTicketToDelete] =
  useState<Ticket | null>(null);

  const deleteTicketMutation = useDeleteTicket();
  const [selectedTicket, setSelectedTicket] =
  useState<Ticket | null>(null);

  /* Why? ->>>> null vs undefined for selectedTicket
      - null means "no ticket selected."
      - undefined means "not yet set."

    null explicitly means "no ticket selected."
      It avoids mixing undefined and object values.
      It's a common React pattern.

*/

  useEffect(() => {
    setPage(1);
    }, [debouncedSearch, status, priority]);
  const {
    data,
    isLoading,
    isError,
    error,
    } = useTickets({
    page,
    limit: 10,
    search: debouncedSearch,
    status,
    priority,
    });

    // <CreateTicketModal
    //   open ={isCreateOpen}
    //   onClose={() => setIsCreateOpen(false)}
    //   mode={mode}
    //   ticket={selectedTicket}

    // />
  if (isLoading) {
    return (
      <div className="p-10">
        Loading tickets...
      </div>
    );
  }

  if (isError) {
    return (
      <pre className="p-10 text-red-600">
        {JSON.stringify(error, null, 2)}
      </pre>
    );
  }

  return (
    <main className="mx-auto max-w-7xl p-8">
      <DashboardHeader
        title="Customer Dashboard"
        onCreateTicket={() => {
          setMode("create");
          setSelectedTicket(null);
          setIsCreateOpen(true);
        }}
      />

      <CreateTicketModal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        mode={mode}
        ticket={selectedTicket}
      />

      <DeleteTicketModal
        open={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setTicketToDelete(null);
        }}
        loading={deleteTicketMutation.isPending}
        onConfirm={() => {
          if (!ticketToDelete) return;

          deleteTicketMutation.mutate(ticketToDelete.id, {
            onSuccess: () => {
              setIsDeleteOpen(false);
              setTicketToDelete(null);
            },
          });
        }}
      />

      <DashboardStats
        tickets={data?.items ?? []}
      />

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <SearchBar
          value={search}
          onChange={setSearch}
        />

        <FilterBar 
            status={status}
            priority={priority}
            onStatusChange={setStatus}
            onPriorityChange={setPriority}
        />
      </div>

      <div className="mt-8">
        <TicketList
          tickets={data?.items ?? []}
          onEdit={(ticket) => {
          setMode("edit");
          setSelectedTicket(ticket);
          setIsCreateOpen(true);
          }}
          onDelete={(ticket) => {
            setTicketToDelete(ticket);
            setIsDeleteOpen(true);
          }}
        />
      </div>
      
      <Pagination
        page={page}
        total={data?.total ?? 0}
        limit={data?.limit ?? 10}
        onPageChange={setPage}
        />
    </main>
  );
}