import React from "react";
import moment from "moment";
import { PlaylistTrack } from "../../../models/playlist";
import { TableCell, TableRow } from "@mui/material";
import { styled } from "@mui/system";
import { Episode, Track } from "../../../models/track";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .MuiTableCell-root": {
    borderBottom: "none",
  },
}));

interface DesktopPlaylistItemProps {
  index: number;
  item: PlaylistTrack;
}

const DesktopPlaylistItem = ({ item, index }: DesktopPlaylistItemProps) => {
  const isEpisode = (track: Track | Episode): track is Episode => {
    return "description" in track;
  };

  return (
    <StyledTableRow>
      <TableCell>{index}</TableCell>
      <TableCell>{item.track?.name || "no name"}</TableCell>
      <TableCell>
        {isEpisode(item.track) ? "N/A" : item.track?.album?.name || "Unknown"}
      </TableCell>
      <TableCell>
        {item.added_at ? moment(item.added_at).format("YYYY-MM-DD") : "Unknown"}
      </TableCell>
      {isEpisode(item.track) ? (
        <TableCell>N/A</TableCell>
      ) : (
        <TableCell>
          {item.track?.duration_ms
            ? moment.utc(item.track.duration_ms).format("mm:ss")
            : "Unknown"}
        </TableCell>
      )}
    </StyledTableRow>
  );
};

export default DesktopPlaylistItem;
