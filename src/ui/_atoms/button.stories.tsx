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

export const Primary = {}
export const PrimaryDisabled = {
  title: 'Primary Disabled',
  args: {
    disabled: true,
  },
}
export const Secondary = {
  args: {
    variant: 'secondary',
  },
}
export const SecondaryDisabled = {
  title: 'Secondary Disabled',
  args: {
    variant: 'sedondary',
    disabled: true,
  },
}
export const PrimarySpinner = {
  title: 'Primary Spinner',
  args: {
    spinner: true,
    disabled: true,
  },
}
export const SecondarySpinner = {
  title: 'Secondary Spinner',
  args: {
    spinner: true,
    variant: 'sedondary',
    disabled: true,
  },
}
