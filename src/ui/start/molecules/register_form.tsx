import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { scale } from '../../../common/utilities'
import { Button } from '../../_atoms/button'
import { TextOrNumInput } from '../../_atoms/text_input'
import { Typography } from '../../_atoms/typography'

export interface RegisterFormProps {
  readonly registerCallback: () => void
}

export const RegisterForm = ({ registerCallback }: RegisterFormProps) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmationPassword, setConfirmationPassword] = useState('')
  const [passwordsMatch, setPasswordsMatch] = useState(false)

  useEffect(() => {
    setPasswordsMatch(
      password === confirmationPassword && password.length > 8 ? true : false
    )
  }, [password, confirmationPassword])

  return (
    <View style={styles.container}>
      <TextOrNumInput value={email} setValue={setEmail} placeholder="name" />
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
      <View style={styles.terms}>
        <Typography text="[ ]" />
        <Typography text="ACCEPT TERMS AND CONDITIONS" />
      </View>
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
    rowGap: scale(3),
    width: '100%',
  },
  terms: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    marginTop: scale(1),
    height: scale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
})
