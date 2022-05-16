import { ValidationStub } from '@/presentation/test'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import React from 'react'
import Login from './login'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const errorMessage = 'Contem erro'
  validationStub.errorMessage = errorMessage
  const sut = render(<Login validation={validationStub} />)
  return {
    sut,
    validationStub
  }
}

describe('Login Component', () => {
  afterEach(cleanup)
  test('Validate the initial state when entering the page login page', () => {
    const { sut, validationStub } = makeSut()
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show error if Validation email fails', () => {
    const { sut, validationStub } = makeSut()
    const emailInput = sut.getByTestId('email')
    const emailGenerico = 'email'
    fireEvent.input(emailInput, { target: { value: emailGenerico } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show error if Validation password fails', () => {
    const { sut, validationStub } = makeSut()
    const passwordInput = sut.getByTestId('password')
    const passwordGenerico = 'password'
    const passwordStatus = sut.getByTestId('password-status')
    fireEvent.input(passwordInput, { target: { value: passwordGenerico } })
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should displayed green ball if the password was correct', () => {
    const { sut, validationStub } = makeSut()
    validationStub.errorMessage = null
    const passwordInput = sut.getByTestId('password')
    const passwordGenerico = 'password'
    const passwordStatus = sut.getByTestId('password-status')
    fireEvent.input(passwordInput, { target: { value: passwordGenerico } })
    expect(passwordStatus.title).toBe('Sucesso!')
    expect(passwordStatus.textContent).toBe('🟢')
  })
})
