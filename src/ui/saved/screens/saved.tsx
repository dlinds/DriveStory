import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import {
  addNewCollectionToStore,
  addStoryToCollection,
  handleNavigate,
  removeStoryFromStore,
  removeStoryToCollection,
  Screens,
  setCurrentSound,
  StateMutate,
} from '../../../../AppStateMutate'
import { scale } from '../../../common/utilities'
import { AppContainer } from '../../app_container/screens/app_container'
import { appColors } from '../../assets/app_colors'
import { Typography } from '../../_atoms/typography'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SavedItem } from '../atoms/saved_item'
import { AddToCollectionPopup } from '../molecules/add_to_collection_popup'
import { SavedStory, StoryCollection } from '../../../../AppStorageUtils'

export const Saved = ({ store, setStore }: StateMutate) => {
  const [filteredCollection, setFilteredCollection] = useState<
    StoryCollection | undefined
  >()

  const currentCollection: StoryCollection | undefined = store.collections
    ? store.collections.filter((c) => c.id === filteredCollection?.id)[0]
    : undefined

  const filteredCollectionItems = store.savedStories?.reduce<SavedStory[]>(
    (acc, curr) =>
      currentCollection &&
      currentCollection.stories.filter((s) => s.storyId === curr.storyId)
        .length > 0
        ? [...acc, curr]
        : [...acc],
    []
  )

  const [isDropdownOpen, setIsDropDownOpen] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  const [currentAddToPopupStory, setCurrentAddToPopupStory] =
    useState<SavedStory>()

  const handleShowCollectionPopup = (story: SavedStory) => {
    setShowPopup(true)
    setCurrentAddToPopupStory(story)
  }

  const addToCollectionPopup = currentAddToPopupStory ? (
    <AddToCollectionPopup
      story={currentAddToPopupStory}
      collections={store.collections}
      addToCollection={(collection: StoryCollection) =>
        addStoryToCollection(
          store,
          setStore,
          collection,
          currentAddToPopupStory
        )
      }
      removeFromCollection={(collection: StoryCollection) =>
        removeStoryToCollection(
          store,
          setStore,
          collection,
          currentAddToPopupStory
        )
      }
      createNewCollection={(newCollectionTitle: string) =>
        addNewCollectionToStore(
          store,
          setStore,
          newCollectionTitle,
          currentAddToPopupStory
        )
      }
    />
  ) : (
    <></>
  )
  const [currentAudioPath, setCurrentAudioPath] = useState<string>()

  const handleSetCurrentSound = (path: string) => {
    if (currentAudioPath === path) {
      setCurrentAudioPath('')
      setCurrentSound(store, setStore, undefined)
    } else {
      setCurrentAudioPath(path)
      setCurrentSound(store, setStore, path)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (!!store.currentSoundPlayer) {
        if (store.currentSoundPlayer.isPlaying()) {
          store.currentSoundPlayer.stop()
          setCurrentAudioPath('')
          setCurrentSound(store, setStore, undefined)
        } else {
          store.currentSoundPlayer.play(() => {
            setCurrentAudioPath('')
            setCurrentSound(store, setStore, undefined)
          })
        }
      }
    }, 100)
  }, [store.currentSoundPlayer])

  return (
    <AppContainer
      showPopup={showPopup}
      popupContent={addToCollectionPopup}
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
            <Typography text="Collections" variant="heading" />
            <Pressable
              style={styles.collectionsDropdown}
              onPress={() => setIsDropDownOpen((prev) => !prev)}
            >
              <Typography
                text={filteredCollection ? filteredCollection.title : 'all'}
              />
              <MaterialCommunityIcon
                name={'menu-down'}
                size={scale(2)}
                color={appColors.offWhite}
              />
            </Pressable>
          </View>
          {store.collections && isDropdownOpen && (
            <View style={styles.selectContainer}>
              <Pressable
                style={styles.collectionItem}
                onPress={() => setFilteredCollection(undefined)}
              >
                <Typography text={'all'} />
                {filteredCollection === undefined && (
                  <View style={styles.selectedFilter}></View>
                )}
              </Pressable>
              {store.collections.map((collection, i) => (
                <Pressable
                  key={i}
                  style={styles.collectionItem}
                  onPress={() => setFilteredCollection(collection)}
                >
                  <Typography text={collection.title} />
                  {filteredCollection === collection && (
                    <View style={styles.selectedFilter}></View>
                  )}
                </Pressable>
              ))}
            </View>
          )}
          <View style={styles.listContainer}>
            {store.savedStories?.map((item) => {
              return (
                (filteredCollection === undefined ||
                  filteredCollectionItems?.includes(item)) && (
                  <SavedItem
                    key={item.storyId}
                    id={item.storyId}
                    label={item.title}
                    setAudioPath={() =>
                      handleSetCurrentSound(item.audioFilePaths[0].filePath)
                    }
                    isSavedItemPlaying={
                      currentAudioPath === item.audioFilePaths[0].filePath
                    }
                    addToCollection={() => handleShowCollectionPopup(item)}
                    deleteItem={() =>
                      removeStoryFromStore(store, setStore, item)
                    }
                  />
                )
              )
            })}
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
    backgroundColor: appColors.altDarkGray,
    borderColor: appColors.mediumGray,
    borderWidth: 1,
    width: scale(21),
    position: 'absolute',
    right: scale(6),
    top: scale(14),
    borderRadius: scale(0.5),
    zIndex: 1000,
    paddingBottom: scale(2),
    paddingTop: scale(1),
    paddingHorizontal: scale(1),
  },
  collectionItem: {
    borderWidth: 1,
    borderColor: appColors.transparent,
    borderBottomColor: appColors.mediumGray,
    borderBottomWidth: 1,
    paddingBottom: scale(0.2),
    height: scale(4),
    marginTop: scale(0.5),
    justifyContent: 'space-between',
    paddingRight: scale(1),
    alignItems: 'flex-end',
    paddingStart: scale(0.5),
    flexDirection: 'row',
  },
  selectedFilter: {
    width: scale(1.5),
    height: scale(1.5),
    borderRadius: scale(1.5),
    backgroundColor: appColors.primaryPurple,
    marginBottom: scale(0.3),
    alignSelf: 'flex-end',
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '10%',
  },
  collectionsDropdown: {
    flexDirection: 'row',
    columnGap: scale(0.5),
    borderBottomColor: appColors.offWhite,
    borderBottomWidth: 1,
    width: scale(20),
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
