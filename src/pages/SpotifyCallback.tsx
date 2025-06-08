import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import useExchangeToken from "../hooks/useExchangeToken";

const SpotifyCallback: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync } = useExchangeToken(); // 🔁 mutate → mutateAsync로 변경

  useEffect(() => {
    const handleTokenExchange = async () => {
      const code = new URLSearchParams(window.location.search).get("code");
      const codeVerifier = localStorage.getItem("code_verifier");

      if (!code || !codeVerifier) {
        navigate("/login");
        return;
      }

      try {
        await mutateAsync({ code, codeVerifier });
        queryClient.invalidateQueries({ queryKey: ["current-user-profile"] });
        navigate("/");
      } catch (error) {
        console.error("Token exchange failed:", error);
        navigate("/login");
      }
    };

    handleTokenExchange();
  }, [mutateAsync, queryClient, navigate]);

  return <div>Logging in with Spotify...</div>;
};

export default SpotifyCallback;
