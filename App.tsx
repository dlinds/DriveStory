import React from 'react'
import { SafeAreaView, ScrollView, StatusBar } from 'react-native'
import { appColors } from './src/ui/assets/app_colors'
import { About } from './src/ui/start/screens/start'

const App = (): JSX.Element => {
  return (
    <SafeAreaView style={{ backgroundColor: appColors.darkGray }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={appColors.darkGray}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <About />
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
// export { default } from './.storybook'
