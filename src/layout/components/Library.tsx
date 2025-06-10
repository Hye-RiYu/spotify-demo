import { styled } from "@mui/material";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import Spinner from "../../common/components/Spinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import Playlist from "./Playlist";
import EmptyPlaylist from "./EmptyPlaylist";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const PlaylistContainer = styled("div")(({ theme }) => ({
  overflowY: "auto",
  maxHeight: "calc(100vh - 240px)",
  height: "100%",
  "&::-webkit-scrollbar": {
    display: "none",
    msOverflowStyle: "none", // IE and Edge
    scrollbarWidth: "none", // Firefox
  },
  [theme.breakpoints.down("sm")]: {
    maxHeight: "calc(100vh - 65px - 119px)",
  },
}));
const Library = () => {
  const { ref, inView } = useInView();
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetCurrentUserPlaylists({
    limit: 10,
    offset: 0,
  });

  console.log("📦 dddddddddddddddata", data);

  const { data: user } = useGetCurrentUserProfile();
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  if (!user) return <EmptyPlaylist />;

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <div>
      <PlaylistContainer>
        {data?.pages.map((page, index) => (
          <Playlist playlists={page.items} key={index} />
        ))}
        <div ref={ref} style={{ height: 40 }}>
          {isFetchingNextPage && <Spinner />}
        </div>
      </PlaylistContainer>
    </div>
  );
};

export default Library;
