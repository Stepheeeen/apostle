import React, { useState, useEffect } from "react";
import axios from "axios";

// Define a type for the song data
interface Song {
  trackId: string;
  title: string;
  author: string;
  trackImg: string;
  previewUrl?: string;
}

export const useFetchSongs = (url: string) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await axios.get<{ data: Song[]; success: boolean }>(url, {
          withCredentials: true,
        });
        if (res.data.success) {
          setSongs(res.data.data);
        } else {
          throw new Error("Failed to fetch songs.");
        }
      } catch (err: any) {
        console.error(err.response?.data || err.message);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [url]);

  return { songs, error, loading };
};
