import axios from "./axios"

export const updateProfile = async (id:number|undefined,data: FormData) => {
  const response = await axios.put(`/api/User/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return response.data;
};