import React from 'react'
import { View } from 'react-native'
import { RecordButton, RecordButtonProps } from './record_button'

const RecordButtonMeta = {
  title: 'Home/Record Button',
  component: RecordButton,
  args: {
    setIsRecording: (val) => console.log(val),
    isRecording: false,
  } as RecordButtonProps,
  decorators: [
    (Story: any) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
}

export default RecordButtonMeta

export const Default = {}
export const ActivityIndicator = {
  args: {
    showIndicator: true,
  } as RecordButtonProps,
}
