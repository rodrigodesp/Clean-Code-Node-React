import { cleanup, fireEvent, render, RenderResult, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { SignUp } from '@/presentation/pages'
import { Helper, ValidationStub, AddAccountSpy } from '@/presentation/test'
import React from 'react'
import { faker } from '@faker-js/faker'
import { EmailInUseError } from '@/domain/errors/email-in-use-error'

type SutTypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy
}

type SutParams = {
  validationError: string

}
const history = createMemoryHistory({ initialEntries: ['/signup'] })
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const addAccountSpy = new AddAccountSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(<SignUp validation={validationStub}
    addAccount={addAccountSpy}/>)
  return {
    sut,
    addAccountSpy
  }
}

export const simulateValidSubmit = async (sut: RenderResult,
  name = faker.internet.userName(),
  email = faker.internet.email(),
  password = faker.internet.password(),
  passwordConfirmation = faker.internet.password()): Promise<void> => {
  Helper.populateField(sut, 'name', name)
  Helper.populateField(sut, 'email', email)
  Helper.populateField(sut, 'password', password)
  Helper.populateField(sut, 'passwordConfirmation', passwordConfirmation)

  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
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
    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name')
  })

  test('Should displayed green ball if the email was correct', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email')
  })

  test('Should displayed green ball if the password was correct', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password')
  })

  test('Should displayed green ball if the password confirmation was correct', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation')
  })

  test('Should enable submit button if the form is valid', () => {
    const password = faker.random.words()
    const { sut } = makeSut()
    Helper.populateField(sut, 'name')
    Helper.populateField(sut, 'email')
    Helper.populateField(sut, 'password', password)
    Helper.populateField(sut, 'passwordConfirmation', password)
    Helper.testButtonIsDisabled(sut, 'submit', false)
  })

  test('Should enable spinner when click on the submit button', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    Helper.testElementExists(sut, 'spinner')
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const name = faker.internet.userName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    const passwordConfirmation = faker.internet.password()
    await simulateValidSubmit(sut, name, email, password, passwordConfirmation)
    expect(addAccountSpy.params).toEqual({ name, email, password, passwordConfirmation })
  })

  test('Should call AddAccount only once', async () => {
    const { sut, addAccountSpy } = makeSut()
    await Helper.simulateValidSubmit(sut)
    await Helper.simulateValidSubmit(sut)
    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('Should call AddAccount if forms is invalid', async () => {
    const { sut, addAccountSpy } = makeSut({ validationError: faker.random.words() })
    await simulateValidSubmit(sut)
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('Should present error if addAccount fails', async () => {
    const { sut, addAccountSpy } = makeSut()
    const error = new EmailInUseError()
    jest
      .spyOn(addAccountSpy, 'add')
      .mockReturnValueOnce(Promise.reject(error))
    await Helper.simulateValidSubmit(sut)

    await waitFor(() => screen.getByTestId('main-error'))
    const mainError = sut.getByTestId('main-error')
    expect(mainError.textContent).toBe(error.message)

    Helper.testChildCount(sut, 'error-wrap', 1)
  })
})
