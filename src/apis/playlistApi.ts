import {
  GetCurrentUserPlaylistRequest,
  GetCurrentUserPlaylistResponse,
} from "../models/playlist";
import api from "../utils/api";

export const getCurrentUserPlaylists = async ({
  limit,
  offset,
}: GetCurrentUserPlaylistRequest): Promise<GetCurrentUserPlaylistResponse> => {
  try {
    const response = await api.get(`/me/playlists`, {
      params: { limit, offset },
    });
    console.log("🎯 Spotify API 응답 데이터:", response.data); // 여기!
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch current user playlists");
  }
};
