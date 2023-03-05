import React from 'react'
import { View } from 'react-native'
import { scale } from '../../common/utilities'
import { Typography, TypographyProps } from './typography'

const TextInputMeta = {
  title: 'Typography',
  component: Typography,
  args: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam, arcu eu sagittis sodales, massa lorem convallis urna, ut bibendum ipsum sem eu diam. Morbi dui erat, tincidunt et lorem ac, pretium laoreet nulla.',
  } as TypographyProps,
  decorators: [
    (Story: any) => (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          paddingHorizontal: scale(8),
        }}
      >
        <Story />
      </View>
    ),
  ],
}

export default TextInputMeta

export const Body = {}
export const Heading = {
  args: {
    variant: 'heading',
    text: 'Heading',
  } as TypographyProps,
}
export const HeadingLarge = {
  args: {
    variant: 'headingLarge',
    text: 'Heading Large',
  } as TypographyProps,
}
