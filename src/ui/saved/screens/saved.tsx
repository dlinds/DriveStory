import React, { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import {
  handleNavigate,
  removeStoryFromStore,
  Screens,
  StateMutate,
} from '../../../../AppStateMutate'
import { scale } from '../../../common/utilities'
import { AppContainer } from '../../app_container/screens/app_container'
import { appColors } from '../../assets/app_colors'
import { Typography } from '../../_atoms/typography'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SavedStory, StoryCollection } from '../../../../AppStorageUtils'
import { SavedItem } from '../atoms/saved_item'

export const Saved = ({ store, setStore }: StateMutate) => {
  const currentCollection: StoryCollection | undefined = store.collections
    ? store.collections.filter((i) => i.id === '7h63i7a3i')[0]
    : undefined

  const itemsToDisplay = store.savedStories?.reduce<SavedStory[]>(
    (acc, curr) =>
      !!currentCollection && currentCollection.itemIds.includes(curr.storyId)
        ? [...acc, curr]
        : [...acc],
    []
  )

  const collectionNames: string[] = store.collections
    ? store.collections.map((i) => i.title)
    : []

  const [isDropdownOpen, setIsDropDownOpen] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  const popupContent = (
    <View style={{ height: 100, width: 100, backgroundColor: 'pink' }} />
  )

  return (
    <AppContainer
      showPopup={showPopup}
      popupContent={popupContent}
      setShowPopup={setShowPopup}
      navigate={(screen: Screens) => handleNavigate(store, setStore, screen)}
    >
      <Pressable
        onPress={() => setIsDropDownOpen(false)}
        style={styles.pressableContainer}
      >
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Typography variant="headingLarge" text="Previous stories" />
          </View>
          <View style={styles.collectionsDropdownContainer}>
            {collectionNames && (
              <>
                <Typography text="Collections" variant="heading" />
                <Pressable
                  style={styles.collectionsDropdown}
                  onPress={() => setIsDropDownOpen((prev) => !prev)}
                >
                  <Typography text="all" />
                  <MaterialCommunityIcon
                    name={'menu-down'}
                    size={scale(2)}
                    color={appColors.offWhite}
                  />
                </Pressable>
                {isDropdownOpen && (
                  <View style={styles.selectContainer}>
                    {collectionNames.map((collection, i) => (
                      <Pressable
                        key={i}
                        style={styles.collectionItem}
                        onPress={() => console.log('test')}
                      >
                        <Typography
                          text={collection}
                          textColor={appColors.darkGray}
                        />
                      </Pressable>
                    ))}
                  </View>
                )}
              </>
            )}
          </View>
          <View style={styles.listContainer}>
            {itemsToDisplay?.map((item) => (
              <SavedItem
                key={item.storyId}
                id={item.storyId}
                label={item.title}
                playPauseItem={() => console.log(item.audioFilePaths)}
                addToCollection={() => setShowPopup(true)}
                deleteItem={() => removeStoryFromStore(store, setStore, item)}
              />
            ))}
          </View>
        </View>
      </Pressable>
    </AppContainer>
  )
}

const styles = StyleSheet.create({
  pressableContainer: {
    flex: 1,
  },
  container: {
    rowGap: scale(2),
  },
  selectContainer: {
    backgroundColor: appColors.offWhite,
    width: scale(15),
    position: 'absolute',
    right: scale(7.5),
    top: scale(2),
    borderRadius: scale(0.5),
    rowGap: scale(2),
    zIndex: 1000,
    paddingVertical: scale(2),
    paddingHorizontal: scale(1),
  },
  collectionItem: {
    borderBottomColor: appColors.darkGray,
    borderBottomWidth: 1,
    paddingBottom: scale(0.2),
    justifyContent: 'center',
    paddingStart: scale(0.5),
  },
  headingContainer: {
    marginTop: scale(2),
    height: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  collectionsDropdownContainer: {
    flexDirection: 'row',
    columnGap: scale(2),
    alignContent: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: '10%',
  },
  collectionsDropdown: {
    flexDirection: 'row',
    columnGap: scale(0.5),
    borderBottomColor: appColors.offWhite,
    borderBottomWidth: 1,
    width: scale(10),
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: scale(0.5),
  },
  listContainer: {
    rowGap: scale(2),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(2),
  },
})
