import { Validation } from '../../../presentation/protocols/validation'
import { FieldValidation } from '../../protocols/field-validation'

export class ValidationComposite implements Validation {

    constructor(private readonly validators: FieldValidation[]) {}

    validate(fieldName: string, filedValue: string): string {
        const validators = this.validators.filter(v => v.fieldName === fieldName)
        for (const validator of validators) {
            const error = validator.validate(filedValue)
            if (error) {
                return error.message
            }
        }
    }
}