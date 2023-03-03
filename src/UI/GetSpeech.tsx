import React, {useState} from 'react';
import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';
import {Pressable, StyleSheet, Text} from 'react-native';

export const GetSpeech = () => {
  const [result, setResult] = useState('');

  const [error, setError] = useState('');

  const [isRecording, setIsRecording] = useState(false);

  Voice.onSpeechStart = () => setIsRecording(true);
  Voice.onSpeechEnd = () => setIsRecording(false);
  Voice.onSpeechError = (err: any) => setError(err.error.message);
  Voice.onSpeechResults = (res: any) => setResult(res.value[0]);

  const startRecording = async () => {
    try {
      await Voice.start('en-us');
    } catch (error: any) {
      console.log({error});
      setError(JSON.stringify(error));
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
    } catch (error: any) {
      console.log({error});
      setError(JSON.stringify(error));
    }
  };

  console.log({result});

  return (
    <Pressable
      style={styles.pressable}
      onPress={() => (isRecording ? stopRecording() : startRecording())}>
      <Text>{isRecording ? 'Stop' : 'Start'}</Text>
      <Text>result: {result as string}</Text>
      <Text>error: {error as string}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    height: 100,
    width: 100,
  },
});
