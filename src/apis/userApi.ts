import axios from "axios";
import { REACT_APP_SPOTIFY_BASE_URL } from "../configs/commonConfig";

export const getCurrentUserProfile = async () => {
  try {
    const response = await axios.get(`${REACT_APP_SPOTIFY_BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user profile");
  }
};
