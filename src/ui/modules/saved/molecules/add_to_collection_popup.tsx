import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Typography } from '../../../components/typography'
import { scale } from '../../../../common/utilities'
import { appColors } from '../../../assets/app_colors'
import { SavedStory, StoryCollection } from '../../../../../AppStorageUtils'
import { TextOrNumInput } from '../../../components/text_input'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

export interface AddToCollectionPopupProps {
  readonly story: SavedStory
  readonly collections?: StoryCollection[]
  readonly addToCollection: (collection: StoryCollection) => void
  readonly removeFromCollection: (collection: StoryCollection) => void
  readonly createNewCollection: (title: string) => void
}

export const AddToCollectionPopup = ({
  story,
  collections,
  addToCollection,
  createNewCollection,
  removeFromCollection,
}: AddToCollectionPopupProps) => {
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false)
  const [newCollectionValue, setNewCollectionValue] = useState<string>('')

  const handleCancelAddingNew = () => {
    setIsAddingNew(false)
    setNewCollectionValue('')
  }

  const handleSubmitAddingNew = () => {
    createNewCollection(newCollectionValue)
    setIsAddingNew(false)
    setNewCollectionValue('')
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Typography
          text={`Which collection would you like to add ${story.title} to?`}
        />
        <View style={styles.collectionContainer}>
          {!isAddingNew ? (
            <TouchableOpacity
              onPress={() => setIsAddingNew(true)}
              style={styles.newItemLinkContainer}
            >
              <Typography text="New" variant="heading" />
            </TouchableOpacity>
          ) : (
            <View style={styles.textInputContainer}>
              <TextOrNumInput
                setValue={setNewCollectionValue}
                value={newCollectionValue}
                maxInput={15}
              />
              <View style={styles.cancelButtonContainer}>
                <TouchableOpacity
                  disabled={newCollectionValue?.length === 0}
                  onPress={handleSubmitAddingNew}
                  hitSlop={styles.hitSlop}
                >
                  <MaterialCommunityIcon
                    name="check"
                    size={scale(3)}
                    color={
                      newCollectionValue?.length === 0
                        ? appColors.mediumGray
                        : appColors.offWhite
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCancelAddingNew}
                  hitSlop={styles.hitSlop}
                >
                  <MaterialCommunityIcon
                    name="close-circle-outline"
                    size={scale(3)}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          {collections?.map((c) => {
            const isStoryInCollection =
              c.stories.filter((s) => s.storyId === story.storyId).length > 0

            return (
              <TouchableOpacity
                key={c.id}
                onPress={
                  isStoryInCollection
                    ? () => removeFromCollection(c)
                    : () => addToCollection(c)
                }
              >
                <Typography
                  text={c.title}
                  textColor={
                    isStoryInCollection
                      ? appColors.offWhite
                      : appColors.mediumGray
                  }
                />
              </TouchableOpacity>
            )
          })}
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
    rowGap: scale(3),
  },
  textInputContainer: {
    width: '100%',
  },
  newItemLinkContainer: {
    marginBottom: scale(2.2),
  },
  cancelButtonContainer: {
    position: 'absolute',
    right: 0,
    top: scale(1),
    flexDirection: 'row',
    columnGap: scale(1),
  },
  hitSlop: {
    top: scale(2),
    bottom: scale(2),
    right: scale(2),
    left: scale(2),
  },
})
