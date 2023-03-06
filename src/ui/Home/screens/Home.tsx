import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Body } from '../molecules/Body'
// import { Header } from '../../_atoms/Header'

export const Home = () => {
  return (
    <View style={styles.container}>
      <Body />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
