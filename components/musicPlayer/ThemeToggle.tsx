// src/components/ThemeToggle.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ThemeToggleProps {
  isDarkTheme: boolean;
  setIsDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkTheme, setIsDarkTheme }) => {
  return (
    <TouchableOpacity onPress={() => setIsDarkTheme(prev => !prev)} style={styles.themeToggle}>
      <Text style={styles.themeToggleText}>
        {isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  themeToggle: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  themeToggleText: {
    color: '#1DB954',
    fontSize: 16,
  },
});

export default ThemeToggle;