import React, { useState } from 'react'
import { View } from 'react-native'
import { SavedStory, StoryCollection } from '../../../../../AppStorageUtils'
import { SavedItem, SavedItemProps } from './saved_item'

const args: SavedItemProps = {
  id: '8h374d',
  label: 'This is a label',
  playPauseItem: () => console.log(''),
  addToCollection: () => console.log(''),
  deleteItem: () => console.log(''),
}

const SavedItemMeta = {
  title: 'Saved/SavedItemp',
  component: SavedItem,
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

export default SavedItemMeta

export const Default = {}
