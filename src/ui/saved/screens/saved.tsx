import React from 'react'
import { View } from 'react-native'
import {
  handleNavigate,
  Screens,
  StateMutate,
} from '../../../../AppStateMutate'
import { AppContainer } from '../../app_container/screens/app_container'

export const Saved = ({ store, setStore }: StateMutate) => {
  return (
    <AppContainer
      navigate={(screen: Screens) => handleNavigate(store, setStore, screen)}
    >
      <></>
    </AppContainer>
  )
}
