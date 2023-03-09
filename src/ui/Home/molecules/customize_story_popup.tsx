import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { Typography } from '../../_atoms/typography'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { scale } from '../../../common/utilities'
import { appColors } from '../../assets/app_colors'
import { TextOrNumInput } from '../../_atoms/text_input'

export interface CustomizeOption {
  label: string
  isSelected: boolean
  customAnswer?: boolean
}
export interface CustomizeStoryPopupProps {
  readonly customizeOptions: CustomizeOption[]
}

const generateCheckmarkIcon = (option: CustomizeOption) => {
  const [isSelected, setIsSelected] = useState<boolean>(option.isSelected)
  const [value, setValue] = useState<string>()

  return (
    <TouchableOpacity
      onPress={() => setIsSelected((prev) => !prev)}
      style={styles.optionContainer}
    >
      <View style={styles.checkmarkRowContainer}>
        <MaterialCommunityIcon
          name={isSelected ? 'check-circle' : 'checkbox-blank-circle-outline'}
          size={scale(3)}
          color={appColors.primaryPurple}
        />
        <Typography text={option.label} variant="heading" />
      </View>
      {option.customAnswer && (
        <View style={styles.customTextContainer}>
          <TextOrNumInput
            multiline
            setValue={setValue}
            value={value}
            placeholder={option.label}
          />
        </View>
      )}
    </TouchableOpacity>
  )
}

export const CustomizeStoryPopup = ({
  customizeOptions,
}: CustomizeStoryPopupProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Typography variant="headingLarge" text="Customize the story" />
      </View>
      <View>
        {customizeOptions.map((option) => (
          <View key={option.label}>{generateCheckmarkIcon(option)}</View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    rowGap: scale(2),
    paddingHorizontal: scale(3),
    paddingVertical: scale(5),
    backgroundColor: appColors.darkGray,
    borderColor: appColors.lightGray,
    borderWidth: 1,
    borderRadius: scale(2),
  },
  headingContainer: {
    alignSelf: 'flex-end',
  },
  optionContainer: {
    marginTop: scale(2),
  },
  customTextContainer: {
    marginTop: scale(1),
    paddingLeft: scale(5),
  },
  checkmarkRowContainer: {
    flexDirection: 'row',
    columnGap: scale(2),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  customText: {
    borderColor: appColors.offWhite,
    borderWidth: 1,
  },
})
