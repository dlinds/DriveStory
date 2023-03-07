import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { AppContainer } from '../../app_container/screens/app_container'
import { Body } from '../molecules/Body'

export const Home = () => {
  return (
    <AppContainer>
      <Body />
    </AppContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
