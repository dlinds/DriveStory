import React from 'react'
import { StyleSheet, View } from 'react-native'
import { scale } from '../../common/utilities'
import { appColors } from '../assets/app_colors'
import { Typography } from './typography'

export const Logo = () => {
  return (
    <View style={styles.outsideContainer}>
      <View style={styles.insideContainer}>
        <Typography variant="headingLarge" text="Storytime" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  outsideContainer: {
    backgroundColor: appColors.primaryPurple,
    padding: scale(0.5),
    elevation: 10,
    borderRadius: 5,
  },
  insideContainer: {
    borderColor: appColors.darkGray,
    borderWidth: 5,
    borderRadius: 5,
    padding: scale(1.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
})
