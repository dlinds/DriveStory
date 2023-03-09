import React from 'react'
import { View } from 'react-native'
import {
  CustomizeStoryPopup,
  CustomizeStoryPopupProps,
} from './customize_story_popup'

const CustomizeStoryPopupMeta = {
  title: 'Home/Customize Story Popup',
  component: CustomizeStoryPopup,
  args: {
    customizeOptions: [
      {
        label: 'Two Characters',
        isSelected: false,
      },
      {
        label: 'Chapters',
        isSelected: false,
      },
      {
        label: 'Use me as the main character',
        isSelected: false,
      },
      {
        label: 'Customize prompt',
        isSelected: false,
        customAnswer: true,
      },
    ],
  } as CustomizeStoryPopupProps,
  decorators: [
    (Story: any) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
}

export default CustomizeStoryPopupMeta

export const Default = {}
