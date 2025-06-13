import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getCurrentUserProfile } from "../apis/userApi";
import { User } from "../models/user";

const useGetCurrentUserProfile = (): UseQueryResult<User, Error> => {
  const accessToken = localStorage.getItem("access_token");
  const isValidToken =
    !!accessToken && accessToken !== "undefined" && accessToken !== "null";

  console.log("🪪 accessToken:", accessToken);
  return useQuery({
    queryKey: ["current-user-profile"],
    queryFn: getCurrentUserProfile,
    enabled: isValidToken,
  });
};

export default useGetCurrentUserProfile;
