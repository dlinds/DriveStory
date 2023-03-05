import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { scale } from '../../common/utilities'

type TypographyVariants = 'heading' | 'body'

export interface TypographyProps {
  readonly text: string
  readonly variant?: TypographyVariants
}

const getTextStyle = (variant: TypographyVariants) => {
  switch (variant) {
    case 'heading':
      return styles.heading
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

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: scale(2),
    lineHeight: scale(2.5),
    letterSpacing: 1,
    color: '#EEEEEE',
  },
  body: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: scale(1.5),
    lineHeight: scale(2),
    letterSpacing: 1,
    color: '#EEEEEE',
  },
})
