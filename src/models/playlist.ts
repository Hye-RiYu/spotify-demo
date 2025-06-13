import { ApiResponse } from "./apiResponse";

import { ExternalUrls, Followers, Image, Owner } from "./commonType";
import { Episode, Track } from "./track";

export interface GetCurrentUserPlaylistRequest {
  limit?: number;
  offset?: number;
}

export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>;

export interface BasePlaylist {
  collaborative?: boolean;
  description?: string | null;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  images: Image[];
  name?: string;
  owner: Owner;
  public?: boolean;
  snapshot_id: string;
  type?: "playlist";
  uri?: string;
}

export interface SimplifiedPlaylist extends BasePlaylist {
  tracks?: { href?: string; total?: number };
}

export interface Playlist extends BasePlaylist {
  tracks: ApiResponse<PlaylistTrack>;
  followers?: Followers;
}

export interface GetPlaylistRequest {
  playlist_id: string;
  market?: string;
  fields?: string;
  additional_types?: string;
}

export interface GetPlaylistItemsRequest extends GetPlaylistRequest {
  limit?: number;
  offset?: number;
}

export type GetPlaylistItemsRespnse = ApiResponse<PlaylistTrack>;

export interface PlaylistTrack {
  added_at?: string | null;
  added_by?: {
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
  } | null;
  is_local?: boolean;
  track: Track | Episode;
}

export interface ExternalIds {
  isrc?: string;
  ean?: string;
  upc?: string;
}

export interface CreatePlaylistRequest {
  name: string;
  public?: boolean;
  collaborative?: boolean;
  description?: string;
}
