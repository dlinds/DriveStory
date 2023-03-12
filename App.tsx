import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StatusBar } from 'react-native'
import { initialState, Store } from './AppStateMutate'
import { handleGetStoreFromState } from './AppStorageUtils'
import { appColors } from './src/ui/assets/app_colors'
import { Home } from './src/ui/Home/screens/home'
import { Saved } from './src/ui/saved/screens/saved'
import { Start } from './src/ui/start/screens/start'

const App = (): JSX.Element => {
  const [store, setStore] = useState<Store>(initialState)

  useEffect(() => {
    const storeFromLocalStore = async () => {
      await handleGetStoreFromState().then((res) => setStore(res))
    }
    storeFromLocalStore()
  }, [])

  const getCurrentScreen = () => {
    const state = { store: store, setStore: setStore }

    switch (store.currentScreen) {
      case 'home':
        return <Home {...state} />
      case 'start':
        return <Start {...state} />
      case 'saved':
        return <Saved {...state} />
      default:
        return <Start {...state} />
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: appColors.darkGray }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={appColors.darkGray}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {getCurrentScreen()}
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
// export { default } from './.storybook'
