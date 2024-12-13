export type Track = {
  title: string;
  author: string;
  trackImg: string;
  previewUrl?: string; // Optional
};

export interface Playlist {
  id: string; // Unique identifier for the playlist
  name: string; // Name of the playlist
  songCount: any;
  description?: string; // Optional description of the playlist
  tracks: Track[]; // Array of tracks in the playlist
  createdAt: Date; // Date the playlist was created
  updatedAt?: Date; // Optional date the playlist was last updated
}
