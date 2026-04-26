
import axios from "./axios"

export const register = async (formData: FormData) => {
 
  const response = await axios.post("/api/ExpertProfile", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return response.data;
};
export const getExperts = async () => {
    const response = await axios.get("/api/ExpertProfile")
    const experts = await response.data
    return experts
}

export const updateExpertProfile = async (id: number | undefined, data: FormData) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(`/api/ExpertProfile/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`
    }
  });
  return response.data;
};
export const getExpertsById = async (id:number|undefined) => {
    const response = await axios.get(`/api/ExpertProfile/${id}`)
    const experts = await response.data
    return experts
}
export const deleteExpertById = async (id: number) => {
    const response = await axios.delete(`/api/ExpertProfile/${id}`)
    return response.data
}
export async function returnExpertById(id: number) {
  const res = await axios.put(`/api/ExpertProfile/return/${id}`);
  return res.data;
}
export async function getExpertByIdJustToTheUser(id: number) {
  const res = await axios.get(`/api/ExpertProfile/justToTheUser/${id}`);
  return res.data;
}