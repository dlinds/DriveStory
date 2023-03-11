import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { scale } from '../../../common/utilities'
import { appColors } from '../../assets/app_colors'

interface CircularPlusButtonProps {
  readonly showPopup: () => void
}

export const CircularPlusButton = ({ showPopup }: CircularPlusButtonProps) => {
  return (
    <TouchableOpacity style={styles.addSettingIcon} onPress={showPopup}>
      <MaterialCommunityIcon
        name={'plus'}
        size={scale(3)}
        color={appColors.offWhite}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  addSettingIcon: {
    //move into own atom
    backgroundColor: appColors.primaryPurple,
    borderColor: appColors.mediumDarkGray,
    borderWidth: scale(0.3),
    height: scale(5),
    width: scale(5),
    borderRadius: scale(5),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginRight: scale(2),
    // marginLeft: scale(3.5),
  },
})
