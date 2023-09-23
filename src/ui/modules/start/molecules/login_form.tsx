import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { scale } from '../../../../common/utilities'
import { Button } from '../../../components/button'
import { TextOrNumInput } from '../../../components/text_input'

export interface LoginFormProps {
  readonly loginCallback: () => void
}

export const LoginForm = ({ loginCallback }: LoginFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.container}>
      <TextOrNumInput
        value={email}
        setValue={setEmail}
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
      <View style={styles.buttonsContainer}>
        <Button text="login" onPress={loginCallback} />
        <Button text="help" onPress={loginCallback} variant="secondary" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    rowGap: scale(2),
    width: '100%',
  },
  buttonsContainer: {
    marginTop: scale(2),
    flexDirection: 'row',
    columnGap: scale(1.8),
  },
})
