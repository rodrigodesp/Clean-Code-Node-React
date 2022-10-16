import React from 'react'
import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication, makeSaveAccessToken } from '@/main/factories'
import { makeLoginValidation } from './login-validation-factory'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      saveAccessToken={makeSaveAccessToken()}
    />
  )
}
