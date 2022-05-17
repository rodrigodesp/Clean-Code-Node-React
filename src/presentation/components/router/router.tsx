import { AccountModel } from '@/domain/models/account-model'
import { mockAccountModel } from '@/domain/test/mock-account'
import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'
import { Login } from '@/presentation/pages'
import { Validation } from '@/presentation/protocols/validation'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

class ValidationStub implements Validation {
  errorMessage: string

  validate (fieldName: string, fieldValue: string): string {
    return this.errorMessage
  }
}

class AuthenticationStub implements Authentication {
  account = mockAccountModel()
  params: AuthenticationParams
  async auth (params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    return await Promise.resolve(this.account)
  }
}

const validationStub = new ValidationStub()
const authenticationStub = new AuthenticationStub()

const Router: React.FC = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login validation={validationStub} authentication={authenticationStub}/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default Router
