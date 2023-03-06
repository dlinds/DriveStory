import React from 'react'
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import { scale } from '../../common/utilities'

interface ButtonProps {
  readonly variant?: 'primary' | 'secondary'
  readonly disabled?: boolean
  readonly text: string
  readonly spinner?: boolean
  readonly onPress: () => void
}

export const Button = ({
  variant = 'primary',
  text,
  onPress,
  spinner,
  disabled,
}: ButtonProps) => {
  const textColor = !disabled ? '#D5D5D5' : '#898989'

  const buttonBody = spinner ? (
    <ActivityIndicator color={textColor} />
  ) : (
    <Text style={{ ...styles.text, color: textColor }}>
      {text.toUpperCase()}
    </Text>
  )

  const variantStyle =
    variant === 'primary' ? styles.primaryContainer : styles.secondaryContainer
  const disabledStyle =
    variant === 'primary'
      ? styles.disabledPrimaryContainer
      : styles.disabledSecondaryContainer

  const buttonBackgroundColor = !disabled ? variantStyle : disabledStyle

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        ...buttonBackgroundColor,
      }}
      onPress={onPress}
      disabled={disabled}
    >
      {buttonBody}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: scale(1.2),
    paddingHorizontal: scale(2),
    borderWidth: 1,
    borderRadius: scale(0.8),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryContainer: {
    borderColor: '#D5D5D5',
    backgroundColor: '#8870CE',
  },
  secondaryContainer: {
    borderColor: '#8870CE',
    backgroundColor: 'transparent',
  },
  disabledPrimaryContainer: {
    borderColor: '#565656',
    backgroundColor: '#564D71',
  },
  disabledSecondaryContainer: {
    borderColor: '#564D71',
    backgroundColor: 'transparent',
  },
  text: {
    fontFamily: Platform.OS === 'android' ? 'Inter' : 'Helvetica',
    fontWeight: '600',
    fontSize: scale(2),
    letterSpacing: 2,
  },
})
