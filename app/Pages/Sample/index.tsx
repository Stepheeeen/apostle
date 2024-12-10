import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import axios from 'axios';
import tw from 'twrnc';

// Define the track type
type Track = {
  trackImg: string;
  title: string;
  author: string;
  trackId: string;
  description: string;
  duration: string;
  previewUrl: string;
  trackUrl: string;
  category: string[];
};

const MusicPlayer: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await axios.get('https://apostle.onrender.com/api/song/getAllSongs', { withCredentials: true });
        setTracks(response.data.data);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching tracks:', error.message);
        setLoading(false);
      }
    };

    fetchTracks();

    // Cleanup when unmounting
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const playPauseHandler = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    } else if (tracks.length > 0) {
      const track = tracks[currentTrackIndex];
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: track.trackUrl });
      setSound(newSound);
      await newSound.playAsync();
      setIsPlaying(true);
    }
  };

  const skipTrackHandler = async (direction: number) => {
    let newIndex = currentTrackIndex + direction;
    if (newIndex < 0) newIndex = tracks.length - 1;
    if (newIndex >= tracks.length) newIndex = 0;

    if (sound) {
      await sound.unloadAsync();
    }

    const track = tracks[newIndex];
    const { sound: newSound } = await Audio.Sound.createAsync({ uri: track.trackUrl });
    setSound(newSound);
    await newSound.playAsync();
    setIsPlaying(true);
    setCurrentTrackIndex(newIndex);
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#4682B4" />
      </View>
    );
  }

  if (tracks.length === 0) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-lg text-gray-500`}>No tracks available.</Text>
      </View>
    );
  }

  const currentTrack = tracks[currentTrackIndex];

  return (
    <View style={tw`flex-1 p-5 justify-center items-center`}>
      {/* Track Image */}
      <Image
        source={{ uri: currentTrack.trackImg }}
        style={tw`w-48 h-48 rounded-lg mb-5`}
      />

      {/* Track Title & Author */}
      <Text style={tw`text-xl font-bold mb-2`}>{currentTrack.title}</Text>
      <Text style={tw`text-lg text-gray-600 mb-2`}>{currentTrack.author}</Text>

      {/* Track Description */}
      <Text style={tw`text-base text-gray-500 mb-5`}>
        {currentTrack.description}
      </Text>

      {/* Playback Controls */}
      <View style={tw`flex-row justify-between w-3/4`}>
        <TouchableOpacity
          onPress={() => skipTrackHandler(-1)}
          style={tw`bg-blue-500 px-4 py-2 rounded-md`}
        >
          <Text style={tw`text-white text-lg`}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={playPauseHandler}
          style={tw`bg-green-500 px-4 py-2 rounded-md`}
        >
          <Text style={tw`text-white text-lg`}>
            {isPlaying ? 'Pause' : 'Play'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => skipTrackHandler(1)}
          style={tw`bg-blue-500 px-4 py-2 rounded-md`}
        >
          <Text style={tw`text-white text-lg`}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MusicPlayer;