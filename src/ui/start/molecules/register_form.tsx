import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { scale } from '../../../common/utilities'
import { Button } from '../../_atoms/button'
import { TextOrNumInput } from '../../_atoms/text_input'
import { Typography } from '../../_atoms/typography'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export interface RegisterFormProps {
  readonly registerCallback: () => void
}

export const RegisterForm = ({ registerCallback }: RegisterFormProps) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmationPassword, setConfirmationPassword] = useState('')
  const [passwordsMatch, setPasswordsMatch] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

  useEffect(() => {
    setPasswordsMatch(
      password === confirmationPassword && password.length > 8 && termsAccepted
        ? true
        : false
    )
  }, [password, confirmationPassword, termsAccepted])

  return (
    <View style={styles.container}>
      <TextOrNumInput
        value={email}
        setValue={setEmail}
        placeholder="name"
        autoCapitalize="words"
      />
      <TextOrNumInput
        value={name}
        setValue={setName}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextOrNumInput
        value={password}
        setValue={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TextOrNumInput
        value={confirmationPassword}
        setValue={setConfirmationPassword}
        placeholder="Confirm Password"
        secureTextEntry={true}
      />
      <Pressable
        style={styles.terms}
        onPress={() => setTermsAccepted((prev) => !prev)}
      >
        <Icon
          name={!termsAccepted ? 'checkbox-blank-outline' : 'checkbox-outline'}
          size={scale(2.5)}
        />
        <Typography variant="heading" text="ACCEPT TERMS AND CONDITIONS" />
      </Pressable>
      <View style={styles.buttonsContainer}>
        <Button
          text="Register"
          onPress={registerCallback}
          disabled={!passwordsMatch}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    rowGap: scale(2),
    width: '100%',
  },
  terms: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scale(1.5),
  },
  buttonsContainer: {
    marginTop: scale(1),
    height: scale(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
})
