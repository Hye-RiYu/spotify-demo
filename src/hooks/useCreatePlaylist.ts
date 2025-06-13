import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlaylist } from "../apis/playlistApi";
import useGetCurrentUserProfile from "./useGetCurrentUserProfile";
import { CreatePlaylistRequest } from "../models/playlist";

const useCreatePlaylist = () => {
  const queryClient = useQueryClient();
  const { data: user } = useGetCurrentUserProfile();
  console.log("Current user profile:", user);
  return useMutation({
    mutationFn: (params: CreatePlaylistRequest) => {
      if (user) {
        return createPlaylist(user.id, params);
      }
      return Promise.reject(new Error("User not found"));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["current-user-playlists"],
      });
      console.log("성공");
    },
  });
};

export default useCreatePlaylist;
