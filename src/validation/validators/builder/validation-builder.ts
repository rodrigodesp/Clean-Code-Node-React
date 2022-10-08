import { FieldValidation } from '../../protocols/field-validation'
import {
  RequiredFieldValidation,
  MinLengthValidation,
  EmailValidation
} from '@/validation/validators'

export class ValidationBuilder {
  private constructor (
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) {}

  static field (fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  required (): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  minLength (value: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldName, value))
    return this
  }

  email (): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName))
    return this
  }

  build (): FieldValidation[] {
    return this.validations
  }
}
