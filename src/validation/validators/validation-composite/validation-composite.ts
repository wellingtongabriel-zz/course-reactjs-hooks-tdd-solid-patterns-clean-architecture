import { Validation } from '../../../presentation/protocols/validation'
import { FieldValidation } from '../../protocols/field-validation'

export class ValidationComposite implements Validation {

    private constructor(private readonly validators: FieldValidation[]) {}

    static build(validators: FieldValidation[]): ValidationComposite {
        return new ValidationComposite(validators)
    }

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