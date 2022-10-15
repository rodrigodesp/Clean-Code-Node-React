import { SignUp } from '@/presentation/pages'
import React from 'react'
import { makeSignupValidation } from './signup-validation-factory'

export const makeSignUp: React.FC = () => {
  return <SignUp validation={makeSignupValidation()} />
}
