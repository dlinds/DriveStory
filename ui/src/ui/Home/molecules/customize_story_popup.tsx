import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Typography } from '../../_atoms/typography'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { scale } from '../../../common/utilities'
import { appColors } from '../../assets/app_colors'
import { TextOrNumInput } from '../../_atoms/text_input'

export interface CustomizeOption {
  readonly label: string
  readonly customAnswer?: boolean
}
export interface CustomizeStoryPopupProps {
  readonly customizeOptions: CustomizeOption[]
  readonly currentlySelectedOptions?: CustomizeOption[]
  readonly setCustomizedText: (value: string) => void
  readonly setSelectedCustomized: (values: CustomizeOption[]) => void
  readonly currentCustomText?: string
}

export const CustomizeStoryPopup = ({
  customizeOptions,
  currentlySelectedOptions = [],
  setCustomizedText,
  setSelectedCustomized,
  currentCustomText = '',
}: CustomizeStoryPopupProps) => {
  const [selected, setSelected] = useState<Array<CustomizeOption>>(
    currentlySelectedOptions
  )

  const handleSelection = (option: CustomizeOption) => {
    if (option.customAnswer) {
      setSelected([option])
      return
    }
    setCustomizedText('')
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((i) => i !== option)
        : [...prev.filter((i) => i.customAnswer !== true), option]
    )
  }

  useEffect(() => {
    setSelectedCustomized(selected)
  }, [selected])

  const handleSetCustomValue = (val: string) => {
    setCustomizedText(val || '')
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Typography variant="headingLarge" text="Customize the story" />
      </View>
      <View>
        {customizeOptions.map((option, index) => {
          const isItemSelected =
            currentlySelectedOptions.filter((i) => i.label === option.label)
              .length > 0 || selected.includes(option)
          return (
            <TouchableOpacity
              onPress={() => handleSelection(option)}
              style={styles.optionContainer}
              key={index}
            >
              <View style={styles.checkmarkRowContainer}>
                <MaterialCommunityIcon
                  name={
                    isItemSelected
                      ? 'check-circle'
                      : 'checkbox-blank-circle-outline'
                  }
                  size={scale(3)}
                  color={appColors.primaryPurple}
                />
                <Typography
                  text={option.label}
                  variant="heading"
                  textColor={isItemSelected ? undefined : appColors.mediumGray}
                />
              </View>
              {option.customAnswer && (
                <View style={styles.customTextContainer}>
                  <TextOrNumInput
                    multiline
                    setValue={handleSetCustomValue}
                    value={currentCustomText}
                    placeholder="..."
                    onPressIn={() => handleSelection(option)}
                    disabled={!selected.includes(option)}
                  />
                </View>
              )}
            </TouchableOpacity>
          )
        })}
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
  optionContainer: {
    marginTop: scale(2),
  },
  customTextContainer: {
    marginTop: scale(1.5),
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
