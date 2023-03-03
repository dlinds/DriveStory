import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import Sound from 'react-native-sound';

const audio = {
  title: 'mp3 via require()',
  isRequire: true,
  url: require('./advertising.mp3'),
};

export const Body = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = (testInfo: any) => {
    setIsPlaying(true);

    const callback = (error: any, sound: any) => {
      if (error) {
        console.log(error.message);
        return;
      }
      testInfo.onPrepared;
      sound.play(() => {
        sound.release();
        setIsPlaying(false);
      });
    };

    // If the audio is a 'require' then the second parameter must be the callback.
    if (testInfo.isRequire) {
      const sound: any = new Sound(testInfo.url, error =>
        callback(error, sound),
      );
    } else {
      const sound: any = new Sound(testInfo.url, testInfo.basePath, error =>
        callback(error, sound),
      );
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => playSound(audio)}>
        <Text style={styles.buttonText}>{isPlaying ? 'Stop' : 'Start'}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 250,
  },
  button: {
    width: 200,
    height: 200,
    borderRadius: 200,
    backgroundColor: 'hotpink',
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 50,
    color: 'black',
  },
});
