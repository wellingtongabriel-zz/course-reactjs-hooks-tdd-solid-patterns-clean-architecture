import { RequiredFieldValidation, EmailValidation, MinLengthValidation } from '../validators'
import { ValidationBuilder as sut } from './validation-builder'

describe('ValidationBuilder', () => {
    it('Should return requiredFieldValidation', () => {
        const validations = sut.field('any_field').required().build()
        expect(validations).toEqual([new RequiredFieldValidation('any_field')])
    })

    it('Should return emailValidation', () => {
        const validations = sut.field('any_email').email().build()
        expect(validations).toEqual([new EmailValidation('any_email')])
    })

    it('Should return MinLengthValidation', () => {
        const validations = sut.field('any_email').min(5).build()
        expect(validations).toEqual([new MinLengthValidation('any_email', 5)])
    })
})