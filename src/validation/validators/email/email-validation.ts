import { FieldValidation } from '../../protocols/field-validation'
import { InvalidFieldError } from '../../errors'

export class EmailValidation implements FieldValidation {
    fieldName: string

    constructor(readonly field: string) {}
    
    validate(value: string): Error {
        return new InvalidFieldError()
    }
}