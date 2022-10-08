import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation
} from '@/validation/validators'
import { ValidationBuilder as sut } from './validation-builder'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const validation = sut.field('any_field').required().build()
    expect(validation).toEqual([new RequiredFieldValidation('any_field')])
  })

  test('Should return EmailValidation', () => {
    const validation = sut.field('any_field').email().build()
    expect(validation).toEqual([new EmailValidation('any_field')])
  })

  test('Should return MinLengthValidation', () => {
    const validation = sut.field('any_field').minLength(5).build()
    expect(validation).toEqual([new MinLengthValidation('any_field', 5)])
  })
})
