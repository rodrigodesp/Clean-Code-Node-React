import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation
} from '@/validation/validators'
import { ValidationBuilder as sut } from './validation-builder'
import faker from 'faker'

const field = faker.database.column()
const length = faker.datatype.number()
describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const validation = sut.field(field).required().build()
    expect(validation).toEqual([new RequiredFieldValidation(field)])
  })

  test('Should return EmailValidation', () => {
    const validation = sut.field(field).email().build()
    expect(validation).toEqual([new EmailValidation(field)])
  })

  test('Should return MinLengthValidation', () => {
    const validation = sut.field(field).minLength(length).build()
    expect(validation).toEqual([new MinLengthValidation(field, length)])
  })

  test('Should return a list of validations', () => {
    const validation = sut
      .field(field)
      .required()
      .minLength(length)
      .email()
      .build()
    expect(validation).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, length),
      new EmailValidation(field)
    ])
  })
})
