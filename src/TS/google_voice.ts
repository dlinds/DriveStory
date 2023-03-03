import Config from 'react-native-config';
import {Platform} from 'react-native';
import {GOOGLE_API} from '../../env';
import Sound from 'react-native-sound';
const RNFS = require('react-native-fs');

export const createFile = async (path: string, data: string) => {
  try {
    return await RNFS.writeFile(path, data, 'base64');
  } catch (err) {
    console.warn(err);
  }

  return null;
};

export const handleTextToSpeech = async (input: string): Promise<string> => {
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
    })
    .catch(error => console.log('error', error));

  return path;
};

export const playMusic = (music: string) => {
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
