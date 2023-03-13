import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Typography } from '../../_atoms/typography'
import { scale } from '../../../common/utilities'
import { appColors } from '../../assets/app_colors'
import { StoryCollection } from '../../../../AppStorageUtils'

export interface AddToCollectionPopupProps {
  readonly storyTitle: string
  readonly collections?: StoryCollection[]
}

export const AddToCollectionPopup = ({
  storyTitle,
  collections,
}: AddToCollectionPopupProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Typography
          text={`Which collection would you like to add ${storyTitle} to?`}
        />
        <View style={styles.collectionContainer}>
          <TouchableOpacity>
            <Typography text="New" variant="heading" />
          </TouchableOpacity>
          {collections?.map((i) => (
            <TouchableOpacity>
              <Typography text={i.title} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    rowGap: scale(2),
    paddingHorizontal: scale(2),
    paddingVertical: scale(5),
    backgroundColor: appColors.darkGray,
    borderColor: appColors.lightGray,
    borderWidth: 1,
    borderRadius: scale(2),
  },
  headingContainer: {
    alignSelf: 'flex-end',
  },
  collectionContainer: {
    marginTop: scale(2),
    alignItems: 'center',
    rowGap: scale(2),
  },
})
