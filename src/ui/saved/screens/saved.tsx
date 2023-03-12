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
          {itemsToDisplay?.map((item) => (
            <SavedItem
              key={item.storyId}
              id={item.storyId}
              label={item.title}
              playPauseItem={() => console.log(item.storyId)}
              addToCollection={() => console.log(item.storyId)}
              deleteItem={() => console.log(item.storyId)}
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
