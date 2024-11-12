// src/components/SliderComponent.tsx
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';

interface SliderComponentProps {
  position: number;
  duration: number;
  sound: Audio.Sound | null;
  setPosition: React.Dispatch<React.SetStateAction<number>>;
}

const SliderComponent: React.FC<SliderComponentProps> = ({ position, duration, sound, setPosition }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        sound.getStatusAsync().then((status) => {
          if (status.isLoaded) {
            setPosition(status.positionMillis || 0);
          }
        }).catch((error) => {
          console.error("Error getting playback status:", error);
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [sound, setPosition]);

  return (
    <Slider
      value={position}
      minimumValue={0}
      maximumValue={duration}
      onSlidingComplete={async (value: number) => {
        if (sound) {
          await sound.setPositionAsync(value);
        }
      }}
      style={styles.slider}
      minimumTrackTintColor="#1DB954"
      maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
      thumbTintColor="#fff"
    />
  );
};

const styles = StyleSheet.create({
  slider: {
    width: '100%',
    marginTop: 16,
  },
});

export default SliderComponent;