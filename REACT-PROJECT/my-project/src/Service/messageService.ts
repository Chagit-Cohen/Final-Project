import axios from "./axios";

export const getMessagesByServiceCallId = async (serviceCallId: number) => {
  const response = await axios.get(`/api/Message/service-call/${serviceCallId}`);
  return response.data;
};