import React from "react";
import { View } from "react-native";
import { GetSpeech } from "./get_speech";

const MyButtonMeta = {
  title: "MyButton",
  component: GetSpeech,
  argTypes: {
    onPress: { action: "pressed the button" },
  },
  args: {
    text: "Hello world",
  },
  decorators: [
    (Story: any) => (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Story />
      </View>
    ),
  ],
};

export default MyButtonMeta;

export const Basic = {};
