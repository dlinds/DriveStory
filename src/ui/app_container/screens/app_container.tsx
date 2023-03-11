import React, { ReactElement, useEffect, useState } from 'react'
import { Dimensions, Pressable, StyleSheet, View } from 'react-native'
import { scale } from '../../../common/utilities'
import { AppFooter } from '../molecules/app_footer'
export interface AppContainerProps {
  readonly children: ReactElement
  readonly hideFooter?: boolean
  readonly showPopup?: boolean
  readonly setShowPopup?: (vis: boolean) => void
  readonly popupContent?: ReactElement
}

export const AppContainer = ({
  children,
  hideFooter = false,
  showPopup = false,
  setShowPopup = () => null,
  popupContent,
}: AppContainerProps) => {
  const popup = (
    <View style={styles.popup}>
      <Pressable
        onPress={() => setShowPopup(false)}
        style={styles.outsideContentPopup}
      ></Pressable>
      {popupContent}
    </View>
  )

  return (
    <>
      {showPopup && popup}
      <View
        style={{
          ...styles.container,
          height: Dimensions.get('screen').height - scale(10),
        }}
      >
        {children}
        {!hideFooter && (
          <View style={styles.footerContainer}>
            <AppFooter />
          </View>
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: scale(1),
  },
  footerContainer: {
    position: 'absolute',
    bottom: scale(0),
    alignSelf: 'center',
    paddingHorizontal: scale(1),
  },
  popup: {
    backgroundColor: '#0000007F',
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(2),
  },
  outsideContentPopup: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
})
