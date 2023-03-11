import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StatusBar } from 'react-native'
import { initialState, Store } from './AppStateMutate'
import { appColors } from './src/ui/assets/app_colors'
import { CustomizeOption } from './src/ui/Home/molecules/customize_story_popup'
import { Home } from './src/ui/Home/screens/home'
import { About } from './src/ui/start/screens/start'

const App = (): JSX.Element => {
  const [store, setStore] = useState<Store>(initialState)

  console.log({ store })

  useEffect(() => {
    console.log(initialState)
  }, [initialState])
  return (
    <SafeAreaView style={{ backgroundColor: appColors.darkGray }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={appColors.darkGray}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {/* <About /> */}
        <Home store={store} setStore={setStore} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
// export { default } from './.storybook'
