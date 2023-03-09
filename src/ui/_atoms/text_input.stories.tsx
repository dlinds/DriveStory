import React from 'react'
import { View } from 'react-native'
import { scale } from '../../common/utilities'
import { TextOrNumInput, TextOrNumInputProps } from './text_input'

const TextInputMeta = {
  title: 'Atoms/Text Input',
  component: TextOrNumInput,
  args: {
    setValue: (value: string) => console.log({ value }),
    placeholder: 'default',
  } as TextOrNumInputProps,
  decorators: [
    (Story: any) => (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          paddingHorizontal: scale(8),
        }}
      >
        <Story />
      </View>
    ),
  ],
}

export default TextInputMeta

export const Default = {}
export const NumbersOnly = {
  args: {
    keyboardType: 'number-pad',
    placeholder: 'Numbers only',
  } as TextOrNumInputProps,
}
export const Multiline = {
  args: {
    multiline: true,
    placeholder: 'multiline',
  } as TextOrNumInputProps,
}
