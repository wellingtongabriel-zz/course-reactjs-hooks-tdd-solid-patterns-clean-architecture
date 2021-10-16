import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import { ValidationSpy } from '@/presentation/test'
import faker from 'faker'

import Login from './login'

type SutTypes = {
    sut: RenderResult
    validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    validationSpy.errorMessage = faker.random.words()
    const sut = render(<Login validation={validationSpy} />)
    return { sut, validationSpy }
}

describe('Login Component', () => {

    afterEach(cleanup)

    it('Should start with initial state', () => {
        const { sut, validationSpy } = makeSut()
        
        const errorWrap = sut.getByTestId('error-wrap')
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        const emailStatus = sut.getByTestId('email-status')
        const passwordStatus = sut.getByTestId('password-status')
        
        expect(errorWrap.childElementCount).toBe(0)
        expect(submitButton.disabled).toBe(true)

        expect(emailStatus.title).toBe(validationSpy.errorMessage)
        expect(passwordStatus.title).toBe('Campo obrigatorio')
        
        expect(emailStatus.textContent).toBe('🔴')
        expect(passwordStatus.textContent).toBe('🔴')
    })

    it('Should call validation with correct email', () => {
        const { sut, validationSpy } = makeSut()
        const emailInput = sut.getByTestId('email')
        const email = faker.internet.email()

        fireEvent.input(emailInput, { target: { value: email } })
        
        expect(validationSpy.fieldName).toEqual('email')
        expect(validationSpy.filedValue).toEqual(email)
    })

    it('Should call validation with correct password', () => {
        const { sut, validationSpy } = makeSut()
        const passwordInput = sut.getByTestId('password')
        const password = faker.internet.password()

        fireEvent.input(passwordInput, { target: { value: password } })
        
        expect(validationSpy.fieldName).toEqual('password')
        expect(validationSpy.filedValue).toEqual(password)
    })

    it('Should show email error is validation fails', () => {
        const { sut, validationSpy } = makeSut()
        const errorMessage = faker.random.words()
        validationSpy.errorMessage = errorMessage
        const emailInput = sut.getByTestId('email')

        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
        const emailStatus = sut.getByTestId('email-status')

        expect(emailStatus.title).toEqual(errorMessage)
        expect(emailStatus.textContent).toEqual('🔴')
    })
})