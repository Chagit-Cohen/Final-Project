import axios from "./axios";
import type { CreateServiceCall } from "../Types/serviceCall";

export const addServiceCall = async (data: CreateServiceCall) => {
  const response = await axios.post("/api/ServiceCall", data);
  return response.data;
};
export const getServiceCallsByClientId = async (clientId: number) => {
  const response = await axios.get(`/api/ServiceCall/client/${clientId}`);
  return response.data;
};

export const getServiceCallsByExpertId = async (expertId: number) => {
  const response = await axios.get(`/api/ServiceCall/expert/${expertId}`);
  return response.data;
};
export const getServiceCallById = async (id: number) => {
  const response = await axios.get(`/api/ServiceCall/${id}`);
  return response.data;
};
export const updateServiceCallStatus = async (id: number, status: string) => {
  const response = await axios.put(`/api/ServiceCall/${id}/status`, status, {
    headers: {
      "Content-Type": "application/json"
    }
  });

  return response.data;
};