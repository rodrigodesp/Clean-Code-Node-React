import { InvalidFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'
import { CompareFieldsValidation } from './compare-fields-validation'

type SutTypes = {
  sut: CompareFieldsValidation
}

const makeSut = (fieldName: string, fieldToCompare: string): SutTypes => {
  const sut = new CompareFieldsValidation(
    fieldName,
    fieldToCompare
  )
  return {
    sut
  }
}

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const fieldName = faker.database.column()
    const fieldToCompare = faker.random.word()
    const { sut } = makeSut(fieldName, fieldToCompare)
    const error = sut.validate({ [fieldName]: faker.random.word(), [fieldToCompare]: faker.random.word() })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if value is valid', () => {
    const fieldName = faker.database.column()
    const fieldToCompare = faker.database.column()
    const valueToCompare = faker.random.word()
    const { sut } = makeSut(fieldName, fieldToCompare)
    const error = sut.validate({ [fieldName]: valueToCompare, [fieldToCompare]: valueToCompare })
    expect(error).toBeFalsy()
  })
})
