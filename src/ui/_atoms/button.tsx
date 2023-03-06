import React from 'react'
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import { scale } from '../../common/utilities'
import { appColors } from '../assets/app_colors'
import { Typography } from './typography'

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
  const buttonBody = spinner ? (
    <ActivityIndicator
      color={disabled ? appColors.mediumGray : appColors.offWhite}
    />
  ) : (
    <Typography
      text={text.toUpperCase()}
      textColor={disabled ? appColors.mediumGray : undefined}
      variant="heading"
    />
  )

  const variantStyle =
    variant === 'primary' ? styles.primaryContainer : styles.secondaryContainer
  const disabledStyle =
    variant === 'primary'
      ? styles.disabledPrimaryContainer
      : styles.disabledSecondaryContainer

  const buttonStyle = !disabled ? variantStyle : disabledStyle

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        ...buttonStyle,
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
    borderColor: appColors.lightGray,
    backgroundColor: appColors.primaryPurple,
  },
  secondaryContainer: {
    borderColor: appColors.primaryPurple,
    backgroundColor: 'transparent',
  },
  disabledPrimaryContainer: {
    borderColor: appColors.mediumGray,
    backgroundColor: appColors.darkPurple,
  },
  disabledSecondaryContainer: {
    borderColor: appColors.darkPurple,
    backgroundColor: 'transparent',
  },
})
