import { faker } from '@faker-js/faker'
import { fireEvent, RenderResult, waitFor } from '@testing-library/react'

export const simulateValidSubmit = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)

  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

export const populateEmailField = (
  sut: RenderResult,
  email = faker.internet.email()
): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

export const populatePasswordField = (
  sut: RenderResult,
  password = faker.internet.password()
): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}
export const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Sucesso!')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

export const testChildCount = (
  sut: RenderResult,
  fieldName: string,
  count: number
): void => {
  const el = sut.getByTestId(fieldName)
  expect(el.childElementCount).toBe(count)
}

export const testElementExists = (
  sut: RenderResult,
  fieldName: string
): void => {
  const el = sut.getByTestId(fieldName)
  expect(el).toBeTruthy()
}

export const testElementText = (
  sut: RenderResult,
  fieldName: string,
  text: string
): void => {
  const el = sut.getByTestId(fieldName)
  expect(el.textContent).toBe(text)
}

export const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean
): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}
