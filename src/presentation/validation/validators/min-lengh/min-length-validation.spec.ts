import { InvalidFieldError } from '@/presentation/validation/errors/'
import { MinLengthValidation } from './min-length-validation'
import faker from 'faker'

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = new MinLengthValidation(faker.random.word(), 5)
    const error = sut.validate('aa')
    expect(error).toEqual(new InvalidFieldError())
  })
})
