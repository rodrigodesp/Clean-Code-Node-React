import { SignUp } from '@/presentation/pages'
import React from 'react'
import { makeRemoteAddAccount } from '@/main/factories/'
import { makeSignupValidation } from './signup-validation-factory'

export const makeSignUp: React.FC = () => {
  return <SignUp validation={makeSignupValidation()} addAccount={makeRemoteAddAccount()} />
}
