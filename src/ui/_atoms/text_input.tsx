import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native'
import { scale } from '../../common/utilities'

export interface TextOrNumInputProps {
  readonly placeholder?: string
  readonly value?: string
  readonly setValue: (val: string) => void
  readonly numbersOnly?: boolean
}

export const TextOrNumInput = ({
  placeholder,
  value = '',
  setValue,
  numbersOnly = false,
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
        keyboardType={numbersOnly ? 'number-pad' : 'default'}
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
    borderBottomColor: '#EDEDED',
    borderBottomWidth: 2,
    color: '#EEEEEE',
    fontSize: scale(2),
    letterSpacing: 1,
  },
  placeholder: {
    position: 'absolute',
    top: scale(2),
    alignSelf: 'center',
    fontSize: scale(2),
    letterSpacing: 2,
    color: '#CBCBCB',
  },
  label: {
    position: 'absolute',
    bottom: scale(4),
    fontSize: scale(1.2),
    color: '#898989',
    letterSpacing: 1,
  },
})
