import { InvalidFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'
import { CompareFieldsValidation } from './compare-fields-validation'

type SutTypes = {
  sut: CompareFieldsValidation
}

const makeSut = (valueToCompare: string): SutTypes => {
  const sut = new CompareFieldsValidation(
    faker.database.column(),
    valueToCompare
  )
  return {
    sut
  }
}

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const { sut } = makeSut(faker.random.word())
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if value is valid', () => {
    const valueToCompare = faker.random.word()
    const { sut } = makeSut(valueToCompare)
    const error = sut.validate(valueToCompare)
    expect(error).toBeFalsy()
  })
})
