import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import {
  handleNavigate,
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

const temp: SavedStory[] = [
  {
    id: 'ah8a7',
    title: 'Goblins, ghouls, and mermaids and more',
    audioFilePaths: [
      {
        id: '9j78ho7',
        filePath: 'file://',
        storyIndex: 1,
      },
      {
        id: '8h77hi8',
        filePath: 'file://',
        storyIndex: 2,
      },
      {
        id: '2524fyda',
        filePath: 'file://',
        storyIndex: 3,
      },
    ],
  },
  {
    id: 'fj348',
    title: 'Giant trees and a chicken',
    audioFilePaths: [
      {
        id: '83offsr',
        filePath: 'file://',
        storyIndex: 1,
      },
    ],
  },
]

const allCollections: StoryCollection = {
  id: '7h63i7a3i',
  title: 'all',
  items: [...temp],
}

export const Saved = ({ store, setStore }: StateMutate) => {
  return (
    <AppContainer
      navigate={(screen: Screens) => handleNavigate(store, setStore, screen)}
    >
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Typography variant="headingLarge" text="Previous stories" />
        </View>
        <View style={styles.collectionsDropdownContainer}>
          <Typography text="Collections" variant="heading" />
          <Pressable style={styles.collectionsDropdown}>
            <Typography text="all" />
            <MaterialCommunityIcon
              name={'menu-down'}
              size={scale(2)}
              color={appColors.offWhite}
            />
          </Pressable>
        </View>
        <View style={styles.listContainer}>
          {allCollections.items.map((item) => (
            <SavedItem
              key={item.id}
              id={item.id}
              label={item.title}
              playPauseItem={() => console.log(item.id)}
              addToCollection={() => console.log(item.id)}
              deleteItem={() => console.log(item.id)}
            />
          ))}
        </View>
      </View>
    </AppContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    rowGap: scale(2),
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
