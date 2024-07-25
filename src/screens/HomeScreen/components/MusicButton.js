import { StyleSheet, TouchableOpacity, View } from "react-native";
import { React, useState, useEffect } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS, } from 'expo-av';

const MusicButton = () => {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  const iconSize = 40; 
  const iconColor = "#FFF";

  const musicOn = (
    <MaterialCommunityIcons 
      name="music" 
      size={iconSize} 
      color={iconColor} 
    />
  );
  const musicOff = (
    <MaterialCommunityIcons 
      name="music-off"
      size={iconSize}
      color={iconColor}
    />
  );

  const icon = isPlaying ? musicOn : musicOff;
  const RainSound = require('../../../../assets/forest_rain.mp3');

  useEffect(() => {
    const setAudioMode = async () => {
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true, // android only
        playsInSilentModeIOS: true,
        shouldDuckAndroid: false, 
        InterruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        InterruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      });
    };

    setAudioMode();

    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
          setSound();
        }
      : undefined;
  }, [sound]);

  const playPauseSound = async () => {
    if (isPlaying) {
      await sound.pauseAsync();
      console.log('Sound paused');
      setIsPlaying(false);
    }
    else {
      if (sound) { 
        await sound.playAsync();
        console.log('Playing Sound');
        setIsPlaying(true);
      } else { 
        try {
          console.log('Loading sound');
          const { sound } = await Audio.Sound.createAsync(RainSound);
          await sound.setIsLoopingAsync(true); // loop indefinitely
          setSound(sound);
  
          await sound.playAsync();
          console.log('Playing Sound');
          setIsPlaying(true);
        } catch (error) {
          console.log("Error playing sound", error);
        }
      }
    }
  };


  return (
    <View className="justify-center items-center">
      <TouchableOpacity onPress={playPauseSound}>{icon}</TouchableOpacity>
    </View>
  );
};

export default MusicButton;

const styles = StyleSheet.create({});