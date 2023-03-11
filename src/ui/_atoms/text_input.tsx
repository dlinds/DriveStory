import React, { useEffect, useState } from 'react'
import {
  KeyboardTypeOptions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { scale } from '../../common/utilities'
import { appColors } from '../assets/app_colors'
import { Typography } from './typography'

export interface TextOrNumInputProps {
  readonly placeholder?: string
  readonly value?: string
  readonly setValue: (val: string) => void
  readonly keyboardType?: KeyboardTypeOptions
  readonly secureTextEntry?: boolean
  readonly autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  readonly multiline?: boolean
  readonly onPressIn?: () => void
  readonly disabled?: boolean
}

export const TextOrNumInput = ({
  placeholder,
  value = '',
  setValue,
  keyboardType = 'default',
  secureTextEntry = false,
  autoCapitalize = 'sentences',
  multiline = false,
  onPressIn,
  disabled,
}: TextOrNumInputProps) => {
  // const [localValue, setLocalValue] = useState(value)

  // useEffect(() => {
  //   setValue(localValue)
  // }, [localValue])

  const textInputStyle = {
    ...styles.textInput,
    ...styles.text,
    ...(multiline ? styles.multilineStyle : {}),
  }

  const placeholderComponent =
    placeholder && value.length <= 0 ? (
      <Text
        style={{
          ...styles.placeholder,
          ...styles.text,
          ...(multiline && styles.multilinePlaceholder),
        }}
      >
        {placeholder.toUpperCase()}
      </Text>
    ) : (
      <>
        {!multiline && (
          <View style={styles.standardLabel}>
            <Typography text={placeholder?.toUpperCase() as string} />
          </View>
        )}
      </>
    )

  return (
    <View style={styles.container}>
      {placeholderComponent}
      <TextInput
        style={textInputStyle}
        onChangeText={setValue}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        onPressIn={onPressIn}
        editable={!disabled}
        value={value}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  text: {
    fontFamily: Platform.OS === 'android' ? 'Inter' : 'Helvetica',
    fontWeight: '600',
  },
  textInput: {
    paddingBottom: scale(0.3),
    paddingHorizontal: 0,
    borderBottomColor: appColors.offWhite,
    borderBottomWidth: 2,
    color: appColors.offWhite,
    fontSize: scale(2),
    letterSpacing: 1,
    flexWrap: 'wrap',
  },
  multilineStyle: {
    height: scale(10),
    borderColor: appColors.mediumGray,
    borderBottomColor: appColors.mediumGray,
    borderWidth: 2,
    paddingHorizontal: scale(1),
    borderRadius: scale(0.7),
    textAlignVertical: 'top',
  },
  placeholder: {
    position: 'absolute',
    top: Platform.OS === 'android' ? scale(2) : 0,
    alignSelf: 'center',
    fontSize: scale(2),
    letterSpacing: 2,
    color: appColors.lightGray,
  },
  multilinePlaceholder: {
    position: 'absolute',
    top: Platform.OS === 'android' ? scale(0.5) : 0,
    paddingHorizontal: scale(1),
    paddingTop: scale(0.5),
    alignSelf: 'auto',
    fontSize: scale(2),
    letterSpacing: 2,
    color: appColors.lightGray,
  },
  standardLabel: {
    position: 'absolute',
    bottom: scale(3.4),
    fontSize: scale(1.2),
    color: appColors.mediumGray,
    letterSpacing: 1,
  },
})
