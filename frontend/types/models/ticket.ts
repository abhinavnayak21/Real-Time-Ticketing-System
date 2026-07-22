export interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  created_at: string;
  owner_id: number;
}

export interface CreateTicketRequest {
  title: string;
  description: string;
  priority: string;
}