import React, { ReactElement, useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { scale } from '../../../common/utilities'
import { AppContainer } from '../../app_container/screens/app_container'
import { appColors } from '../../assets/app_colors'
import { Logo } from '../../_atoms/logo'
import { Typography } from '../../_atoms/typography'
import { LoginForm } from '../molecules/login_form'
import { RegisterForm } from '../molecules/register_form'
import { StateMutate, handleNavigate } from '../../../../AppStateMutate'

type ActiveView = 'login' | 'register' | 'start'

export const Start = ({ store, setStore }: StateMutate) => {
  const handleSetScreen = (view: ActiveView) => {
    switch (view) {
      case 'login':
        setCurrentScreen(
          <LoginForm
            loginCallback={() => handleNavigate(store, setStore, 'home')}
          />
        )
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
        <TouchableOpacity onPress={() => setActiveView('login')}>
          <Typography text="Login" variant="headingLarge" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveView('register')}>
          <Typography text="Register" variant="headingLarge" />
        </TouchableOpacity>
      </View>
    </>
  )

  const [currentScreen, setCurrentScreen] = useState<ReactElement>(defaultStart)
  const [activeView, setActiveView] = useState<ActiveView>('start')

  useEffect(() => {
    handleSetScreen(activeView)
  }, [activeView])

  return (
    <AppContainer hideFooter={true}>
      <View style={styles.screen}>
        <Logo />
        <>
          {currentScreen}
          {activeView !== 'start' && (
            <TouchableOpacity
              onPress={() => setActiveView('start')}
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
