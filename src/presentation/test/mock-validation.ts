import { Validation } from '@/presentation/protocols/validation'

export class ValidationStub implements Validation {
  errorMessage: string

  validate (fieldName: string, filedValue: string): string {
    return this.errorMessage
  }
}
