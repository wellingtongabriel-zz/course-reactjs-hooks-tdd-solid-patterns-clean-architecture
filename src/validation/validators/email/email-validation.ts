import { FieldValidation } from '../../protocols/field-validation'
import { InvalidFieldError } from '../../errors'

export class EmailValidation implements FieldValidation {
    fieldName: string

    constructor(readonly field: string) {}
    
    validate(value: string): Error {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(value) ? null : new InvalidFieldError()
    }
}