import React, { useState } from 'react'
import { View } from 'react-native'
import {
  AddToCollectionPopup,
  AddToCollectionPopupProps,
} from './add_to_collection_popup'

const AddToCollectionPopupMeta = {
  title: 'Saved/Add to Collection Popup',
  component: AddToCollectionPopup,
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

export default AddToCollectionPopupMeta

export const Default = {}
