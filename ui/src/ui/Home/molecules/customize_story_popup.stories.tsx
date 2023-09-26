import React, { useState } from 'react'
import { View } from 'react-native'
import {
  CustomizeStoryPopup,
  CustomizeStoryPopupProps,
} from './customize_story_popup'

const args: CustomizeStoryPopupProps = {
  customizeOptions: [
    {
      label: 'Two Characters',
    },
    {
      label: 'Chapters',
    },
    {
      label: 'Use me as the main character',
    },
    {
      label: 'Customize prompt',
      customAnswer: true,
    },
  ],
  setCustomizedText: (val: string) => console.log(val),
  setSelectedCustomized: (vals) => console.log(vals),
}

const CustomizeStoryPopupMeta = {
  title: 'Home/Customize Story Popup',
  component: CustomizeStoryPopup,
  args,
  decorators: [
    (Story: any) => {
      return (
        <View
          style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
        >
          <Story />
        </View>
      )
    },
  ],
}

export default CustomizeStoryPopupMeta

export const Default = {}
