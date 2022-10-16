import { cleanup, render, RenderResult } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { SignUp } from '@/presentation/pages'
import { Helper, ValidationStub } from '@/presentation/test'
import React from 'react'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}
const history = createMemoryHistory({ initialEntries: ['/signup'] })
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(<SignUp validation={validationStub} />)
  return {
    sut
  }
}

const validationError = faker.random.words()

describe('Signup Component', () => {
  afterEach(cleanup)
  test('The initial state when entering the signup page', () => {
    const { sut } = makeSut({ validationError })
    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  test('Should show name error if Validation fails', () => {
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password', validationError)
  })

  test('Should show passwordConfirmation error if Validation fails', () => {
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  test('Should displayed green ball if the name was correct', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'name', faker.internet.userName())
    Helper.testStatusForField(sut, 'name')
  })

  test('Should displayed green ball if the email was correct', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'email', faker.internet.email())
    Helper.testStatusForField(sut, 'email')
  })

  test('Should displayed green ball if the password was correct', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'password', faker.internet.password())
    Helper.testStatusForField(sut, 'password')
  })
})
