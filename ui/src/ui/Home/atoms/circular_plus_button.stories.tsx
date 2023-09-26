import React from 'react'
import { View } from 'react-native'
import { CircularPlusButton } from './circular_plus_button'

const CircularPlusButtonMeta = {
  title: 'Home/CircularPlusButton',
  component: CircularPlusButton,
  // args: {
  //   setIsRecording: (val) => console.log(val),
  //   isRecording: false,
  // } as RecordButtonProps,
  decorators: [
    (Story: any) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
}

export default CircularPlusButtonMeta

export const Default = {}
export const ActivityIndicator = {
  // args: {
  //   showIndicator: true,
  // } as CircularPlusButton,
}
