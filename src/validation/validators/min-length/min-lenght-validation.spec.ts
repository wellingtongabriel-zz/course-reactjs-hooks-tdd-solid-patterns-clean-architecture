import { InvalidFieldError } from '../../errors'
import { MinLengthValidation } from './min-lenght-validation'
import faker from 'faker'

const makeSut = (): MinLengthValidation => new MinLengthValidation(faker.database.column(), 5)

describe('MinLenghtValidation', () => {
    
    it('Should return error if valie is invalid', () => {
        const sut = makeSut()
        const error = sut.validate(faker.random.alphaNumeric(4))
        expect(error).toEqual(new InvalidFieldError())
    })

    it('Should return false if valie is valid', () => {
        const sut = makeSut()
        const error = sut.validate(faker.random.alphaNumeric(5))
        expect(error).toBeFalsy()
    })
})