import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import Sound from 'react-native-sound';
import {OpenAPIRequest, queryOpenAi} from '../TS/chat_gpt';
import {handleTextToSpeech} from '../TS/google_voice';
import {GetSpeech} from './GetSpeech';

export const Body = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const [audioPath, setAudioPath] = useState('');

  const playMusic = (path: string) => {
    const speech = new Sound(audioPath, '', error => {
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

  const handleCallGoogle = async (story: string) => {
    const audioPathBack = await handleTextToSpeech(story).then(res => res);
    setAudioPath(audioPathBack);
    playMusic(audioPath);
  };

  const [hasInitiated, setHasInitiated] = useState(false);

  const [story, setStory] = useState('');

  const handleAskForParameters = async (prompt: string) => {
    const storyResult = (await queryOpenAi({prompt})).data.choices[0].text;
    setStory(storyResult ? storyResult : '');
    setHasInitiated(!!storyResult);
  };

  useEffect(() => {
    hasInitiated && handleCallGoogle(story);
  }, [story]);

  useEffect(() => {
    hasInitiated &&
      setTimeout(() => {
        if (audioPath !== '') {
          playMusic(audioPath);
        }
      }, 5000);
  }, [audioPath]);

  return (
    <View style={styles.container}>
      <GetSpeech getPromptCallback={handleAskForParameters} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 200,
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
