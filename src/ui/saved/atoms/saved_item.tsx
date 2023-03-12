import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { scale } from '../../../common/utilities'
import { appColors } from '../../assets/app_colors'
import { Typography } from '../../_atoms/typography'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

export interface SavedItemProps {
  readonly label: string
  readonly id: string
  readonly isPlaying?: boolean
  readonly playPauseItem: () => void
  readonly addToCollection: () => void
  readonly deleteItem: () => void
}

export const SavedItem = ({
  label,
  id,
  isPlaying = false,
  playPauseItem,
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
        <TouchableOpacity onPress={playPauseItem} hitSlop={styles.iconHitslop}>
          <MaterialCommunityIcon
            name={!isPlaying ? 'play' : 'stop'}
            size={scale(3)}
            color={!isPlaying ? appColors.offWhite : appColors.softRed}
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
