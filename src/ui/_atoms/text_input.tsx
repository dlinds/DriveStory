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

export interface TextOrNumInputProps {
  readonly placeholder?: string
  readonly value?: string
  readonly setValue: (val: string) => void
  readonly keyboardType?: KeyboardTypeOptions
  readonly secureTextEntry?: boolean
  readonly autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
}

export const TextOrNumInput = ({
  placeholder,
  value = '',
  setValue,
  keyboardType = 'default',
  secureTextEntry = false,
  autoCapitalize = 'sentences',
}: TextOrNumInputProps) => {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setValue(localValue)
  }, [localValue])

  return (
    <View style={styles.container}>
      {placeholder && localValue.length <= 0 ? (
        <Text style={{ ...styles.placeholder, ...styles.text }}>
          {placeholder.toUpperCase()}
        </Text>
      ) : (
        <Text style={{ ...styles.label, ...styles.text }}>
          {placeholder?.toUpperCase()}
        </Text>
      )}
      <TextInput
        style={{ ...styles.textInput, ...styles.text }}
        onChangeText={setLocalValue}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
      >
        {localValue}
      </TextInput>
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
  },
  placeholder: {
    position: 'absolute',
    top: Platform.OS === 'android' ? scale(2) : 0,
    alignSelf: 'center',
    fontSize: scale(2),
    letterSpacing: 2,
    color: appColors.lightGray,
  },
  label: {
    position: 'absolute',
    bottom: scale(3.4),
    fontSize: scale(1.2),
    color: appColors.mediumGray,
    letterSpacing: 1,
  },
})
