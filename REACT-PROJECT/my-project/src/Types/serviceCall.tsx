export type ServiceCall = {
  id: number;
  clientId: number;
  expertId: number;
  title: string;
  description: string;
  initialImageUrl?: string | null;
  status: string;
  createdAt: string;
};

export type CreateServiceCall = {
  clientId: number;
  expertId: number;
  title: string;
  description: string;
  initialImageUrl?: string | null;
};