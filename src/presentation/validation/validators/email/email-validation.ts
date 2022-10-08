import { FieldValidation } from '@/presentation/validation/protocols/field-validation'
import { InvalidFieldError } from '@/presentation/validation/errors/'

export class EmailValidation implements FieldValidation {
  constructor (readonly field: string) {}
  validate (value: string): Error {
    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    return !value || emailRegex.test(value) ? null : new InvalidFieldError()
  }
}
