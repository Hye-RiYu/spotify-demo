import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableContainer,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { useInView } from "react-intersection-observer";
import DefaultImage from "../../common/components/DefaultImage";
import Spinner from "../../common/components/Spinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import DesktopPlaylistItem from "./components/DesktopPlaylistItem";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import EmptyPlaylistWithSearch from "./components/EmptyPlaylistWithSearch";
import LoginButton from "../../common/components/LoginButton";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  height: "calc(100% - 64px)",
  borderRadius: "8px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
}));

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: playlist,
    isLoading: isPlayListLoading,
    error: playlistError,
  } = useGetPlaylist({
    playlist_id: id ?? "",
  });

  if (!id || id === "undefined") return <Navigate to="/" />;

  const {
    data: palylistItems,
    isLoading: isPlaylistItemsLoading,
    error: playlistItemsError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: id, limit: PAGE_LIMIT, offset: 0 });

  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPlayListLoading || isPlaylistItemsLoading) return <Spinner />;

  const error = playlistError || playlistItemsError;
  if (error) {
    const status = (error as any)?.response?.status;
    if (status === 401) {
      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          flexDirection="column"
        >
          <Typography variant="h2" fontWeight={700} mb="20px">
            다시 로그인 하세요
          </Typography>
          <LoginButton />
        </Box>
      );
    }
    return <ErrorMessage errorMessage={error?.message || "Failed to load"} />;
  }

  return (
    <div>
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
        <Box
          sx={{
            gridColumn: { xs: "1 / -1", md: "1 / 3" },
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

        <Box
          sx={{
            gridColumn: { xs: "1 / -1", md: "3 / 13" },
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
            <Typography
              variant="subtitle1"
              color="white"
              ml={1}
              fontWeight={700}
            >
              {playlist?.owner?.display_name || "unknown"}
            </Typography>
            <Typography variant="subtitle1" color="white" ml={1}>
              • {playlist?.tracks?.total} songs
            </Typography>
          </Box>
        </Box>
      </Grid>

      {playlist?.tracks?.total === 0 ? (
        <EmptyPlaylistWithSearch />
      ) : (
        <StyledTableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Album</TableCell>
                <TableCell>Date added</TableCell>
                <TableCell>Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {palylistItems?.pages.map((page, pageIndex) =>
                page.items.map((item, itemindex) => (
                  <DesktopPlaylistItem
                    item={item}
                    key={pageIndex * PAGE_LIMIT + itemindex + 1}
                    index={pageIndex * PAGE_LIMIT + itemindex + 1}
                  />
                ))
              )}
              <TableRow sx={{ height: "5px" }} ref={ref} />
              {isFetchingNextPage && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <CircularProgress size={24} />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </StyledTableContainer>
      )}
    </div>
  );
};

export default PlaylistDetailPage;
