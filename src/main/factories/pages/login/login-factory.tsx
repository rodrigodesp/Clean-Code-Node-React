import React from 'react'
import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication } from '@/main/factories'
import { makeLoginValidation } from './login-validation-factory'
import { makeLocalStorageAdapter } from '../../usercases/cache/local-storage-adapter-factory'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      saveAccessToken={makeLocalStorageAdapter()}
    />
  )
}
