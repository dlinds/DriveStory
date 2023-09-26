import React from 'react'
import { View } from 'react-native'
import { scale } from '../../../common/utilities'
import { RegisterForm, RegisterFormProps } from './register_form'

const RegisterFormMeta = {
  title: 'Register Form',
  component: RegisterForm,
  args: {
    registerCallback: () => console.log('registered'),
  } as RegisterFormProps,
  decorators: [
    (Story: any) => (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          paddingHorizontal: scale(5),
        }}
      >
        <Story />
      </View>
    ),
  ],
}

export default RegisterFormMeta

export const Default = {}
