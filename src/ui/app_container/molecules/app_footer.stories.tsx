import React from 'react'
import { View } from 'react-native'
import { scale } from '../../../common/utilities'
import { AppFooter } from './app_footer'

const AppFooterMeta = {
  title: 'App Footer',
  component: AppFooter,
  args: {
    children: <></>,
  },
  decorators: [
    (Story: any) => (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          padding: scale(2),
        }}
      >
        <Story />
      </View>
    ),
  ],
}

export default AppFooterMeta

export const Default = {}
