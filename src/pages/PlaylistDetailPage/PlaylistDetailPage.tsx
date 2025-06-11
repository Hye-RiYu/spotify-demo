import { Navigate, useParams } from "react-router";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { Box, Grid, Typography } from "@mui/material";
import DefaultImage from "../../common/components/DefaultImage";

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: playlist } = useGetPlaylist({
    playlist_id: id ?? "",
  });

  if (!id || id === "undefined") return <Navigate to="/" />;

  return (
    <Grid
      container
      columns={12}
      columnSpacing={7}
      sx={{
        display: "grid",
        alignItems: "center",
        background: "linear-gradient(transparent 0, rgba(0, 0, 0, 0.5) 100%)",
        padding: "16px",
      }}
    >
      {/* 왼쪽 이미지 영역 */}
      <Box
        sx={{
          gridColumn: { xs: "1 / -1", md: "1 / 3" }, // 전체 or 2칸
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {playlist?.images ? (
          <Box
            component="img"
            src={playlist.images[0].url}
            alt="playlist_cover.jpg"
            sx={{
              borderRadius: "8px",
              height: "auto",
              width: "100%",
              maxWidth: { md: "200px" },
            }}
          />
        ) : (
          <DefaultImage>
            <MusicNoteIcon fontSize="large" />
          </DefaultImage>
        )}
      </Box>

      {/* 오른쪽 텍스트 영역 */}
      <Box
        sx={{
          gridColumn: { xs: "1 / -1", md: "3 / 13" }, // 남은 10칸
        }}
      >
        <Typography
          variant="h1"
          color="white"
          sx={{
            fontSize: { xs: "1rem", md: "3rem" },
            textAlign: "left",
          }}
        >
          {playlist?.name}
        </Typography>

        <Box display="flex" alignItems="center" mt={1}>
          <Box
            component="img"
            src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5"
            alt="Spotify Logo"
            sx={{ width: 20 }}
          />
          <Typography variant="subtitle1" color="white" ml={1} fontWeight={700}>
            {playlist?.owner?.display_name || "unknown"}
          </Typography>
          <Typography variant="subtitle1" color="white" ml={1}>
            • {playlist?.tracks?.total} songs
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default PlaylistDetailPage;
