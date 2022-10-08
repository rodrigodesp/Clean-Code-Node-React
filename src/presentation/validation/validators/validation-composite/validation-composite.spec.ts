import { FieldValidationSpy } from '../test/mock-field-validation'
import { ValidationComposite } from './validation-composite'
import faker from 'faker'

type SutTypes = {
  sut: ValidationComposite
  fieldsValidationSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldsValidationSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]
  const sut = new ValidationComposite(fieldsValidationSpy)
  return {
    sut,
    fieldsValidationSpy
  }
}

const fieldName = faker.database.column()

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const errorMessage = faker.random.words()
    const { sut, fieldsValidationSpy } = makeSut(fieldName)
    fieldsValidationSpy[0].error = new Error(errorMessage)
    fieldsValidationSpy[1].error = new Error(faker.random.word())

    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBe(errorMessage)
  })

  test('Should return falsy if there is no error', () => {
    const { sut } = makeSut(fieldName)

    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBeFalsy()
  })
})
