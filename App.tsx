import React from 'react'
import { Dimensions, SafeAreaView, ScrollView } from 'react-native'

import { Home } from './src/ui/Home/screens/Home'
import { About } from './src/ui/About/screens/about'

const App = (): JSX.Element => {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <About />
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
// export { default } from './.storybook'
