import Config from 'react-native-config';
import {Platform} from 'react-native';
import {GOOGLE_API} from '../../env';
const RNFS = require('react-native-fs');

export const createRequest = (): RequestInit => {
  const key = GOOGLE_API;
  // const address = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${key}`;
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      uri: `https://texttospeech.googleapis.com/v1/text:synthesize?key=${key}`,
      input: {
        text: 'This is a test',
      },
      voice: {
        languageCode: 'en-US',
        name: 'en-US-Standard-B',
        ssmlGender: 'FEMALE',
      },
      audioConfig: {
        audioEncoding: 'MP3',
      },
    },
    method: 'POST',
  };
};

export const createFile = async (path: any, data: any) => {
  try {
    return await RNFS.writeFile(path, data, 'base64');
  } catch (err) {
    console.warn(err);
  }

  return null;
};
