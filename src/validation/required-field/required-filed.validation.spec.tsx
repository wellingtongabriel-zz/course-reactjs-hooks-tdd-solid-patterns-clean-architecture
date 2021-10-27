import { RequiredFieldError } from "../errors"
import { RequiredFieldValidation } from "./required-filed-validation"
import faker from 'faker'

describe('RequiredFieldValidation', () => {
 
    it('Should return error if field is empty', () => {
        const sut = new RequiredFieldValidation('email')
        const error = sut.validate('')
        expect(error).toEqual(new RequiredFieldError())
    })

    it('Should return falsy if field is not empty', () => {
        const sut = new RequiredFieldValidation('email')
        const error = sut.validate(faker.random.word())
        expect(error).toBeFalsy()
    })
})