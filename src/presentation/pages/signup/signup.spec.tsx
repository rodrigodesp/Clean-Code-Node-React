import { render, RenderResult } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { SignUp } from '@/presentation/pages'
import { Helper } from '@/presentation/test'
import React from 'react'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}
const history = createMemoryHistory({ initialEntries: ['/signup'] })
const makeSut = (): SutTypes => {
  const sut = render(<SignUp />)
  return {
    sut
  }
}

describe('Signup Component', () => {
  test('The initial state when entering the signup page', () => {
    const validationError = 'Campo Obrigatório'
    const { sut } = makeSut()
    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
