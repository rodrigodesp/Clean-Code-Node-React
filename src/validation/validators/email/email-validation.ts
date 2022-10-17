import { FieldValidation } from '@/validation/protocols/field-validation'
import { InvalidFieldError } from '@/validation/errors/'

export class EmailValidation implements FieldValidation {
  constructor (readonly fieldName: string) {}
  validate (input: object): Error {
    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    return !input[this.fieldName] || emailRegex.test(input[this.fieldName]) ? null : new InvalidFieldError()
  }
}
