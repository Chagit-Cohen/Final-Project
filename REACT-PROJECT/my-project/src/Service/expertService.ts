
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