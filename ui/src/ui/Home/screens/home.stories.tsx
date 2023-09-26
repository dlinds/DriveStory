import React from 'react'
import { View } from 'react-native'
import { scale } from '../../../common/utilities'
import { Home } from './home'

const HomeMeta = {
  title: 'Home/Screen',
  component: Home,
  decorators: [
    (Story: any) => (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          marginBottom: scale(12),
        }}
      >
        <Story />
      </View>
    ),
  ],
}

export default HomeMeta

export const Default = {}
