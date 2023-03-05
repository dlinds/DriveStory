import React, { useEffect, useState } from "react";
import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from "@react-native-voice/voice";
import { Pressable, StyleSheet, Text } from "react-native";

interface GetSpeechProps {
  readonly getPromptCallback: (prompt: string) => void;
}

export const GetSpeech = ({ getPromptCallback }: GetSpeechProps) => {
  // const [result, setResult] = useState<string>("");

  // const [didRecord, setDidRecord] = useState(false);

  // const [error, setError] = useState("");

  // const [isRecording, setIsRecording] = useState(false);

  // Voice.onSpeechStart = () => setIsRecording(true);
  // Voice.onSpeechEnd = () => {
  //   setIsRecording(false);
  //   setDidRecord(true);
  // };
  // Voice.onSpeechError = (err: any) => setError(err.error.message);
  // Voice.onSpeechResults = (res: any) => setResult(res.value[0]);

  // const startRecording = async () => {
  //   try {
  //     await Voice.start("en-us");
  //   } catch (error: any) {
  //     console.log({ error });
  //     setError(JSON.stringify(error));
  //   }
  // };

  // const stopRecording = async () => {
  //   try {
  //     await Voice.stop();
  //   } catch (error: any) {
  //     console.log({ error });
  //     setError(JSON.stringify(error));
  //   }
  // };

  // useEffect(() => {
  //   getPromptCallback(result);
  // }, [result]);

  return (
    <Pressable
      style={styles.pressable}
      // onPress={() => (isRecording ? stopRecording() : startRecording())}
    >
      <Text style={styles.pressableText}>
        {"STORY TIME"}
        {/* {isRecording ? "STOP" : "STORY TIME"} */}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    height: 250,
    width: 250,
    borderRadius: 10,
    backgroundColor: "hotpink",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },
  pressableText: {
    fontSize: 50,
    letterSpacing: 5,
    textAlign: "center",
  },
});
