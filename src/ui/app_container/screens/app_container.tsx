import React, { ReactElement } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { scale } from '../../../common/utilities'
import { AppFooter } from '../molecules/app_footer'
export interface AppContainerProps {
  readonly children: ReactElement
  readonly hideFooter?: boolean
}

export const AppContainer = ({
  children,
  hideFooter = false,
}: AppContainerProps) => {
  return (
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
})
