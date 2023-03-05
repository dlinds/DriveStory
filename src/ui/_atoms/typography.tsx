import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { scale } from '../../common/utilities'

type TypographyVariants = 'body' | 'heading' | 'headingLarge'

export interface TypographyProps {
  readonly text: string
  readonly variant?: TypographyVariants
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

export const Typography = ({ variant = 'body', text }: TypographyProps) => {
  return (
    <Text style={getTextStyle(variant)}>
      {variant === 'body' ? text : text.toUpperCase()}
    </Text>
  )
}

const defaultTextStyle = StyleSheet.create({
  text: {
    fontFamily: 'Inter',
    color: '#EEEEEE',
    letterSpacing: 1,
  },
})

const styles = StyleSheet.create({
  body: {
    ...defaultTextStyle.text,
    fontFamily: 'Inter',
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