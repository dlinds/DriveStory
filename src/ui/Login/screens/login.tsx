import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { scale } from '../../../common/utilities'
import { Logo } from '../../_atoms/logo'
import { Typography } from '../../_atoms/typography'

export const Login = () => {
  return (
    <View
      style={{
        ...styles.screen,
        height: Dimensions.get('screen').height - scale(10), //fix this
      }}
    >
      <Logo />
      <View style={styles.textContainer}>
        <Typography text="Login" variant="headingLarge" />
        <Typography text="Register" variant="headingLarge" />
      </View>
      <View style={styles.textContainer}>
        <Typography text="About" variant="headingLarge" />
        <Typography
          text="This is the about what is the 
product and all of that stuff"
          variant="body"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    padding: scale(6),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: scale(2),
    marginVertical: scale(3),
  },
})
