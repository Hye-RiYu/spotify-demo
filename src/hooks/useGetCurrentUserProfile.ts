import { useQuery } from "@tanstack/react-query";
import { getCurrentUserProfile } from "../apis/userApi";

const useGetCurrentUserProfile = () => {
  return useQuery({
    queryKey: ["current-user-profile"],
    queryFn: getCurrentUserProfile,
  });
};

export default useGetCurrentUserProfile;
