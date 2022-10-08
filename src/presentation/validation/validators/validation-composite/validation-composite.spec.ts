import { FieldValidationSpy } from '../test/mock-field-validation'
import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: ValidationComposite
  fieldsValidationSpy: FieldValidationSpy[]
}

const makeSut = (): SutTypes => {
  const fieldsValidationSpy = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field')
  ]
  const sut = new ValidationComposite(fieldsValidationSpy)
  return {
    sut,
    fieldsValidationSpy
  }
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const { sut, fieldsValidationSpy } = makeSut()
    fieldsValidationSpy[0].error = new Error('first_error_message')
    fieldsValidationSpy[1].error = new Error('second_error_message')

    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('first_error_message')
  })
})
