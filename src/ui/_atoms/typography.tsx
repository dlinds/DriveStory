import React from 'react'
import { Platform, StyleSheet, Text } from 'react-native'
import { scale } from '../../common/utilities'
import { appColors } from '../assets/app_colors'

type TypographyVariants = 'body' | 'heading' | 'headingLarge'

export interface TypographyProps {
  readonly text: string
  readonly variant?: TypographyVariants
  readonly textColor?: string
}

const getTextStyle = (variant: TypographyVariants) => {
  switch (variant) {
    case 'heading':
      return styles.heading
    case 'headingLarge':
      return styles.headingLarge
    case 'body':
      return styles.body
    default:
      return styles.body
  }
}

export const Typography = ({
  variant = 'body',
  text,
  textColor,
}: TypographyProps) => {
  const color = textColor ? { color: textColor } : {}
  return (
    <Text style={{ ...getTextStyle(variant), ...color }}>
      {variant.includes('heading') ? text.toUpperCase() : text}
    </Text>
  )
}

const defaultTextStyle = StyleSheet.create({
  text: {
    fontFamily: Platform.OS === 'android' ? 'Inter' : 'Helvetica',
    color: appColors.offWhite,
    letterSpacing: 1,
  },
})

const styles = StyleSheet.create({
  body: {
    ...defaultTextStyle.text,
    fontFamily: Platform.OS === 'android' ? 'Inter' : 'Helvetica',
    fontWeight: '500',
    fontSize: scale(1.5),
    lineHeight: scale(2),
  },
  heading: {
    ...defaultTextStyle.text,
    fontWeight: '600',
    fontSize: scale(2),
  },
  headingLarge: {
    ...defaultTextStyle.text,
    fontWeight: '600',
    fontSize: scale(3),
  },
})
