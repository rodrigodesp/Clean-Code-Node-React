import { FieldValidation } from '@/presentation/validation/protocols/field-validation'
import { InvalidFieldError } from '@/presentation/validation/errors/'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly field: string, private readonly minLength: number) {}
  validate (value: string): Error {
    return value.length < this.minLength ? new InvalidFieldError() : null
  }
}
