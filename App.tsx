import React from 'react'
import { Dimensions, SafeAreaView, ScrollView } from 'react-native'

import { Home } from './src/ui/Home/screens/Home'
import { Login } from './src/ui/Login/screens/login'

const App = (): JSX.Element => {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Login />
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
// export { default } from './.storybook'
