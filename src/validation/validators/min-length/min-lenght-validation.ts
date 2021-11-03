import { FieldValidation } from '../../protocols/field-validation'
import { InvalidFieldError } from '../../errors'

export class MinLengthValidation implements FieldValidation {
    fieldName: string

    constructor(readonly field: string, private readonly minLength: number) {}
    
    validate(value: string): Error {
        return new InvalidFieldError()
    }

}