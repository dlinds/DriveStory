import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import Sound from 'react-native-sound';
import {GOOGLE_API} from '../../env';
import {createFile, createRequest} from '../TS/google_voice';
import {GetSpeech} from './GetSpeech';
const RNFS = require('react-native-fs');
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

  const playMusic = (music: any) => {
    const speech = new Sound(music, '', error => {
      if (error) {
        console.warn('failed to load the sound', error);

        return null;
      }
      speech.play(success => {
        if (!success) {
          console.warn('playback failed due to audio decoding errors');
        }
      });

      return null;
    });
  };

  // const speech = async (text: string) => {
  //   const address = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${key}`;
  //   const payload = createRequest();
  //   const path = `${RNFS.DocumentDirectoryPath}/voice.mp3`;
  //   try {
  //     const response = await fetch(`${address}`, payload);
  //     const result = await response.json();
  //     console.log(result);
  //     await createFile(path, result.audioContent);
  //     playMusic(path);
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  const [audioPath, setAudioPath] = useState('');

  const gTest = async (input: string) => {
    const key = GOOGLE_API;
    const path = `${RNFS.DocumentDirectoryPath}/${Date.now()}.mp3`;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      input: {
        text: input,
      },
      voice: {
        languageCode: 'en-gb',
        name: 'en-GB-Neural2-F',
        ssmlGender: 'FEMALE',
      },
      audioConfig: {
        audioEncoding: 'MP3',
      },
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${key}`,
      requestOptions,
    )
      .then(response => response.text())
      .then(async result => {
        await createFile(path, result);
        setAudioPath(path);
      })
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    audioPath && playMusic(audioPath);
  }, [audioPath]);

  const story = `Once upon a time, there were three pirates named Jack, Jill, and Jim. They loved to sail the seas in search of treasure, but they had grown tired of the same old routine. So, one day, they decided to try something new and adventurous.

  They heard of a ski mountain that was said to be filled with gold and diamonds, and they set out to find it. After many days of sailing, they finally arrived at the foot of the mountain. They quickly realized that they had no idea how to climb a mountain covered in snow and ice. That's when they saw a helicopter flying above them.
  
  Without hesitation, they pulled out their pirate flag and signaled the helicopter for help. To their surprise, the helicopter pilot was also a treasure hunter who knew about the mountain's hidden riches. He agreed to give them a lift to the top of the mountain in exchange for a share of the treasure.
  
  As they reached the peak, they spotted a group of rival pirates who were also after the same treasure. A wild snowball fight broke out between the two groups, and the battle lasted for hours. Eventually, the three pirates emerged victorious and found the treasure hidden in a cave.
  
  They were overjoyed with their newfound wealth, but they knew that they couldn't carry it all back to their ship. That's when they remembered the helicopter. They quickly called the pilot back and loaded up the treasure into the helicopter's cargo hold.
  
  As they soared over the mountain, they looked down at the stunning view of the snow-covered landscape. They realized that they had embarked on an unforgettable adventure, filled with new experiences and exciting challenges.
  
  From that day on, Jack, Jill, and Jim continued to sail the seas in search of treasure, but they never forgot their thrilling adventure on the ski mountain with the helicopter. And they always kept an eye out for new and exciting ways to explore the world around them.`;

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => gTest(story)}>
        <Text style={styles.buttonText}>{isPlaying ? 'Stop' : 'Start'}</Text>
      </Pressable>
      <View style={styles.getSpeech}>
        <GetSpeech />
      </View>
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
  getSpeech: {
    marginTop: 100,
    backgroundColor: 'black',
    height: 100,
    width: 100,
  },
});
