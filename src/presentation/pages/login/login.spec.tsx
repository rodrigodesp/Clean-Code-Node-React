import { ValidationStub } from '@/presentation/test'
import { AuthenticationSpy } from '@/presentation/test/mock-authentication'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import React from 'react'
import Login from './login'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(<Login validation={validationStub} authentication={authenticationSpy}/>)
  return {
    sut,
    authenticationSpy
  }
}

const validationError = 'contem erro'

describe('Login Component', () => {
  afterEach(cleanup)
  test('Validate the initial state when entering the page login page', () => {
    const { sut } = makeSut({ validationError })
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show error if Validation email fails', () => {
    const { sut } = makeSut({ validationError })
    const emailInput = sut.getByTestId('email')
    const emailGenerico = 'email'
    fireEvent.input(emailInput, { target: { value: emailGenerico } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show error if Validation password fails', () => {
    const { sut } = makeSut({ validationError })
    const passwordInput = sut.getByTestId('password')
    const passwordGenerico = 'password'
    const passwordStatus = sut.getByTestId('password-status')
    fireEvent.input(passwordInput, { target: { value: passwordGenerico } })
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should displayed green ball if the email was correct', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    const emailGenerico = 'email'
    const emailStatus = sut.getByTestId('email-status')
    fireEvent.input(emailInput, { target: { value: emailGenerico } })
    expect(emailStatus.title).toBe('Sucesso!')
    expect(emailStatus.textContent).toBe('🟢')
  })

  test('Should displayed green ball if the password was correct', () => {
    const { sut } = makeSut()
    const passwordInput = sut.getByTestId('password')
    const passwordGenerico = 'password'
    const passwordStatus = sut.getByTestId('password-status')
    fireEvent.input(passwordInput, { target: { value: passwordGenerico } })
    expect(passwordStatus.title).toBe('Sucesso!')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  test('Should enable submit button if the form is valid', () => {
    const { sut } = makeSut()

    const emailInput = sut.getByTestId('email')
    const emailGenerico = 'email'
    fireEvent.input(emailInput, { target: { value: emailGenerico } })

    const passwordInput = sut.getByTestId('password')
    const passwordGenerico = 'password'
    fireEvent.input(passwordInput, { target: { value: passwordGenerico } })

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Sucesso!')
    expect(passwordStatus.textContent).toBe('🟢')

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Sucesso!')
    expect(emailStatus.textContent).toBe('🟢')

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('Should enable spinner when click on the submit button', () => {
    const { sut } = makeSut()

    const emailInput = sut.getByTestId('email')
    const emailGenerico = 'email'
    fireEvent.input(emailInput, { target: { value: emailGenerico } })

    const passwordInput = sut.getByTestId('password')
    const passwordGenerico = 'password'
    fireEvent.input(passwordInput, { target: { value: passwordGenerico } })

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Sucesso!')
    expect(passwordStatus.textContent).toBe('🟢')

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Sucesso!')
    expect(emailStatus.textContent).toBe('🟢')

    const submitButton = sut.getByTestId('submit')
    fireEvent.submit(submitButton)

    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()

    const emailInput = sut.getByTestId('email')
    const email = 'email'
    fireEvent.input(emailInput, { target: { value: email } })

    const passwordInput = sut.getByTestId('password')
    const password = 'password'
    fireEvent.input(passwordInput, { target: { value: password } })

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Sucesso!')
    expect(passwordStatus.textContent).toBe('🟢')

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Sucesso!')
    expect(emailStatus.textContent).toBe('🟢')

    const submitButton = sut.getByTestId('submit')
    fireEvent.submit(submitButton)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
})
