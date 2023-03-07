import React from 'react'
import { View } from 'react-native'
import { AppContainer, AppContainerProps } from './app_container'

const AppContainerMeta = {
  title: 'App Container',
  component: AppContainer,
  args: {
    children: <></>,
  } as AppContainerProps,
  decorators: [
    (Story: any) => (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <Story />
      </View>
    ),
  ],
}

export default AppContainerMeta

export const Default = {}
