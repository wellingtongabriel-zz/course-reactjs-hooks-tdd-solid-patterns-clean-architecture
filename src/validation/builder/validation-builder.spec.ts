import { RequiredFieldValidation } from '../validators/required-field/required-filed-validation'
import { ValidationBuilder as sut } from './validation-builder'

describe('ValidationBuilder', () => {
    it('Should return requiredFieldValidation', () => {
        const validations = sut.field('any_field').required().build()
        expect(validations).toEqual([new RequiredFieldValidation('any_field')])
    })
})