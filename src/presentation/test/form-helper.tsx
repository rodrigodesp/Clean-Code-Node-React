import { faker } from '@faker-js/faker'
import { fireEvent, RenderResult, waitFor } from '@testing-library/react'

export const simulateValidSubmit = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  populateField(sut, 'email', email)
  populateField(sut, 'password', password)

  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

export const populateField = (sut: RenderResult, fieldName: string, value = faker.random.word()): void => {
  const input = sut.getByTestId(fieldName)
  fireEvent.input(input, { target: { value: value } })
}

export const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Sucesso!')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

export const testChildCount = (sut: RenderResult, fieldName: string, count: number): void => {
  const el = sut.getByTestId(fieldName)
  expect(el.childElementCount).toBe(count)
}

export const testElementExists = (sut: RenderResult, fieldName: string): void => {
  const el = sut.getByTestId(fieldName)
  expect(el).toBeTruthy()
}

export const testElementText = (sut: RenderResult, fieldName: string, text: string): void => {
  const el = sut.getByTestId(fieldName)
  expect(el.textContent).toBe(text)
}

export const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}
