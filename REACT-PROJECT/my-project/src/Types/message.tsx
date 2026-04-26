export type Message = {
  id: number;
  serviceCallId: number;
  senderId: number;
  content?: string;
  attachmentUrl?: string;
  sentAt: string;
};