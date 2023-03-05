import React from 'react'
import { View } from 'react-native'
import { scale } from '../../common/utilities'
import { Logo } from './logo'

const LogoMeta = {
  title: 'Logo',
  component: Logo,
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

export default LogoMeta

export const Default = {}
