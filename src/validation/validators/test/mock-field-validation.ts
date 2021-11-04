import { FieldValidation } from "../../protocols/field-validation"

export class FieldValidationSpy implements FieldValidation {
    fieldName: string
    error: Error = null

    constructor(readonly field: string) {
        this.fieldName = field
    }

    validate(value: string): Error {
        return this.error
    }
}
