import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Typography } from '../../../_atoms/typography'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { scale } from '../../../../common/utilities'
import { appColors } from '../../../assets/app_colors'
import { TextOrNumInput } from '../../../_atoms/text_input'

export type CustomizeOptionLabels =
  | 'Two Characters'
  | 'Chapters'
  | 'Use me as the main character'
  | 'Customize prompt'

export interface CustomizeOption {
  readonly label: CustomizeOptionLabels
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
    console.log('toggle option', option)

    if (option.customAnswer) {
      setSelected((prev) => {
        if (prev[0] === option) {
          setCustomizedText('')
          return []
        }
        return [option]
      })
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

  const placeholdersForCustomPrompts = [
    'Give me lessons on {topic}',
    'Tell me an adult story about {topic}',
    'Summarize the history of {topic}',
  ]

  const [currentPlaceholder, setCurrentPlaceholder] = useState(
    placeholdersForCustomPrompts[0]
  )

  useEffect(() => {
    const interval = setInterval(() => {
      const currentPlaceholderIndex =
        placeholdersForCustomPrompts.indexOf(currentPlaceholder)

      setCurrentPlaceholder(
        currentPlaceholderIndex === placeholdersForCustomPrompts.length - 1
          ? placeholdersForCustomPrompts[0]
          : placeholdersForCustomPrompts[currentPlaceholderIndex + 1]
      )
    }, 3000)

    return () => {
      clearInterval(interval)
    }
  }, [currentPlaceholder])

  const handlePressTextBox = (option: CustomizeOption) => {
    handleSelection(option)
    setSelected([option])
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
            <View key={index}>
              <TouchableOpacity
                onPress={() => handleSelection(option)}
                style={styles.optionContainer}
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
                    textColor={
                      isItemSelected ? undefined : appColors.mediumGray
                    }
                  />
                </View>
              </TouchableOpacity>
              {option.customAnswer && (
                <View style={styles.customTextContainer}>
                  <TextOrNumInput
                    multiline
                    setValue={handleSetCustomValue}
                    value={currentCustomText}
                    placeholder={currentPlaceholder}
                    disabled={!selected.includes(option)}
                    onPressIn={() => handlePressTextBox(option)}
                  />
                </View>
              )}
            </View>
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
    alignSelf: 'center',
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
