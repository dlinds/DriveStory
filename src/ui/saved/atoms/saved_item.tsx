import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { scale } from '../../../common/utilities'
import { appColors } from '../../assets/app_colors'
import { Typography } from '../../_atoms/typography'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Sound from 'react-native-sound'

export interface SavedItemProps {
  readonly label: string
  readonly id: string
  readonly setAudioPath: () => void
  readonly isSavedItemPlaying: boolean
  readonly addToCollection: () => void
  readonly deleteItem: () => void
}
Sound.setCategory('Playback')

export const SavedItem = ({
  label,
  id,
  isSavedItemPlaying,
  setAudioPath,
  addToCollection,
  deleteItem,
}: SavedItemProps) => {
  return (
    <View style={styles.listItem}>
      <View style={styles.titleContainer}>
        <Typography text={label} />
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={addToCollection}
          hitSlop={styles.iconHitslop}
        >
          <MaterialCommunityIcon
            name={'plus'}
            size={scale(3)}
            color={appColors.offWhite}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={setAudioPath} hitSlop={styles.iconHitslop}>
          <MaterialCommunityIcon
            name={!isSavedItemPlaying ? 'play' : 'stop'}
            size={scale(3)}
            color={!isSavedItemPlaying ? appColors.offWhite : appColors.softRed}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteItem} hitSlop={styles.iconHitslop}>
          <MaterialCommunityIcon
            name={'trash-can'}
            size={scale(2.7)}
            color={appColors.offWhite}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    maxWidth: '70%',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: scale(1),
    width: '90%',
  },
  iconContainer: {
    flexDirection: 'row',
    columnGap: scale(1),
  },
  iconHitslop: {
    top: scale(1),
    bottom: scale(1),
    left: scale(1),
    right: scale(1),
  },
})
