import { FieldValidation } from '@/presentation/validation/protocols/field-validation'
import { InvalidFieldError } from '@/presentation/validation/errors/'

export class EmailValidation implements FieldValidation {
  constructor (readonly field: string) {}
  validate (value: string): Error {
    return new InvalidFieldError()
  }
}
