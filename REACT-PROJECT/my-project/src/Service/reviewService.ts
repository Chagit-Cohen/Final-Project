import axios from "./axios"

export async function getReviewsByExpertId(expertId: number) {
  try {
    const response = await axios.get(`/api/Review/expert/${expertId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

export async function addReview(data: {
  expertProfileId: number;
  clientId: number;
  rating: number;
  comment: string;
  clientName: string;
}) {
  const response = await axios.post("/api/Review", data);
  return response.data;
}