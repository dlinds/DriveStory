import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds'
import { View } from 'react-native'
import { appColors } from '../src/ui/assets/app_colors'
export const decorators = [
  withBackgrounds,
  (Story) => (
    <View style={{ flex: 1, backgroundColor: appColors.darkGray }}>
      <Story />
    </View>
  ),
]
export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'black',
  },
}
