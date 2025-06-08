import React from "react";
import { Avatar, Box, IconButton, styled } from "@mui/material";
import LoginButton from "../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { useQueryClient } from "@tanstack/react-query";

// 스타일
const ProfileContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: "8px",
});

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();
  const queryClient = useQueryClient();

  const logout = () => {
    localStorage.removeItem("access_token");
    queryClient.removeQueries(); // React Query 캐시 정리
    window.location.reload(); // 새로고침으로 LoginButton 보이게
  };

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      height="64px"
      paddingRight="16px"
    >
      {userProfile ? (
        <ProfileContainer>
          <IconButton onClick={logout} size="small">
            <Avatar
              src={userProfile.images[0]?.url}
              alt={userProfile.display_name}
            />
          </IconButton>
        </ProfileContainer>
      ) : (
        <LoginButton />
      )}
    </Box>
  );
};

export default Navbar;
