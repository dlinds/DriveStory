import React, { ReactElement, useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { scale } from '../../../common/utilities'
import { AppContainer } from '../../app_container/screens/app_container'
import { appColors } from '../../assets/app_colors'
import { Logo } from '../../_atoms/logo'
import { Typography } from '../../_atoms/typography'
import { LoginForm } from '../molecules/login_form'
import { RegisterForm } from '../molecules/register_form'

type ScreenType = 'login' | 'register' | 'start'

export const About = () => {
  const handleSetScreen = (screen: ScreenType) => {
    switch (screen) {
      case 'login':
        setCurrentScreen(<LoginForm loginCallback={() => console.log('')} />)
        break
      case 'register':
        setCurrentScreen(
          <RegisterForm registerCallback={() => console.log('')} />
        )
        break
      default:
        setCurrentScreen(defaultStart)
        break
    }
  }

  const defaultStart = (
    <>
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={() => setScreenElement('login')}>
          <Typography text="Login" variant="headingLarge" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setScreenElement('register')}>
          <Typography text="Register" variant="headingLarge" />
        </TouchableOpacity>
      </View>
    </>
  )

  const [currentScreen, setCurrentScreen] = useState<ReactElement>(defaultStart)
  const [screenElement, setScreenElement] = useState<ScreenType>('start')

  useEffect(() => {
    handleSetScreen(screenElement)
  }, [screenElement])

  return (
    <AppContainer>
      <View style={styles.screen}>
        <Logo />
        <>
          {currentScreen}
          {screenElement !== 'start' && (
            <TouchableOpacity
              onPress={() => setScreenElement('start')}
              hitSlop={styles.backHitSlop}
              style={styles.back}
            >
              <Typography text="Back" variant="heading" />
            </TouchableOpacity>
          )}
        </>
        <View style={styles.textContainer}>
          <Typography text="About" variant="headingLarge" />
          <Typography
            text="This is the about what is the product and all of that stuff"
            variant="body"
          />
        </View>
      </View>
    </AppContainer>
  )
}

const styles = StyleSheet.create({
  screen: {
    padding: scale(4),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: scale(2),
    marginVertical: scale(6),
  },
  back: {
    borderBottomColor: appColors.offWhite,
    borderBottomWidth: 1,
  },
  backHitSlop: {
    top: scale(3),
    bottom: scale(3),
    left: scale(3),
    right: scale(3),
  },
})
