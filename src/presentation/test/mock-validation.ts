import { Validation } from '@/presentation/protocols/validation'

export class ValidationSpy implements Validation {
    errorMessage: string
    fieldName: string
    filedValue: string

    validate(fieldName: string, filedValue: string): string {
        this.fieldName = fieldName
        this.filedValue = filedValue
        return this.errorMessage
    }
}