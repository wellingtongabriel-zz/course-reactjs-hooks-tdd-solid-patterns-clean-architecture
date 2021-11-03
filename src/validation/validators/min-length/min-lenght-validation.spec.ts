import { InvalidFieldError } from '../../errors'
import { MinLengthValidation } from './min-lenght-validation'

describe('MinLenghtValidation', () => {
    
    it('Should return error if valie is invalid', () => {
        const sut = new MinLengthValidation('field', 5)
        const error = sut.validate('123')
        expect(error).toEqual(new InvalidFieldError())
    })

    it('Should return false if valie is valid', () => {
        const sut = new MinLengthValidation('field', 5)
        const error = sut.validate('12345')
        expect(error).toBeFalsy()
    })
})