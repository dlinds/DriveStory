import React from 'react'
import { View } from 'react-native'
import { scale } from '../../../common/utilities'
import { LoginForm, LoginFormProps } from './login_form'

const LoginFormMeta = {
  title: 'Login Form',
  component: LoginForm,
  args: {
    loginCallback: () => console.log('logged in!'),
  } as LoginFormProps,
  decorators: [
    (Story: any) => (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          paddingHorizontal: scale(8),
        }}
      >
        <Story />
      </View>
    ),
  ],
}

export default LoginFormMeta

export const Default = {}
