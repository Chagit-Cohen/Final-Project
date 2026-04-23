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
