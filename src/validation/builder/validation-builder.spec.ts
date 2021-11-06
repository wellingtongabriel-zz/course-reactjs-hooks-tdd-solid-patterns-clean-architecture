import { RequiredFieldValidation, EmailValidation } from '../validators'
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
})