import React from 'react'
import { View } from 'react-native'
import { scale } from '../../common/utilities'
import { Button } from './button'

const ButtonMeta = {
  title: 'Button',
  component: Button,
  args: {
    text: 'Hello world',
    onPress: () => console.log('pressed'),
  },
  decorators: [
    (Story: any) => (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <View style={{ width: scale(21) }}>
          <Story />
        </View>
      </View>
    ),
  ],
}

export default ButtonMeta

export const Basic = { variant: 'primary' }
export const Secondary = { variant: 'secondary' }
