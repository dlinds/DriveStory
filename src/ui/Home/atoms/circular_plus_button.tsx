import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { scale } from '../../../common/utilities'
import { appColors } from '../../assets/app_colors'
import { Typography } from '../../_atoms/typography'

interface CircularPlusButtonProps {
  readonly showPopup: () => void
  readonly text?: string
  readonly customText?: string
}

export const CircularPlusButton = ({
  showPopup,
  text,
  customText,
}: CircularPlusButtonProps) => {
  return (
    <TouchableOpacity style={styles.circularButtonRow} onPress={showPopup}>
      <View style={styles.addSettingIcon}>
        <MaterialCommunityIcon
          name={'plus'}
          size={scale(3)}
          color={appColors.offWhite}
        />
      </View>
      {text && <Typography text={text} variant="heading" />}
      {customText && <Typography text={customText} />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  circularButtonRow: {
    flexDirection: 'row',
    margin: 0,
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    width: '85%',
    paddingEnd: scale(8),
  },
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
