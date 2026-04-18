import axios from "./axios"

export const login = async (email: string, password: string) => {
  
  const response = await axios.post("/api/UserLogin", {
    email,
    password
  });

  return response.data;
};


export const register = async (formData: FormData) => {
  console.log("Submitting user:", formData);
  const response = await axios.post("/api/User", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return response.data;
};

export const getUserByToken = async () => {
    const response = await axios.get("/api/User/me");
    return response.data;
}