import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import { Validation } from '../../protocols/validation'

import Login from './login'

type SutTypes = {
    sut: RenderResult
    validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
    errorMessage: string
    fieldName: string
    filedValue: string

    validate(fieldName: string, filedValue: string): string {
        this.fieldName = fieldName
        this.filedValue = filedValue
        return this.errorMessage
    }
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const sut = render(<Login validation={validationSpy} />)
    return { sut, validationSpy }
}

describe('Login Component', () => {

    afterEach(cleanup)

    it('Should start with initial state', () => {
        const { sut } = makeSut()
        
        const errorWrap = sut.getByTestId('error-wrap')
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        const emailStatus = sut.getByTestId('email-status')
        const passwordStatus = sut.getByTestId('password-status')
        
        expect(errorWrap.childElementCount).toBe(0)
        expect(submitButton.disabled).toBe(true)

        expect(emailStatus.title).toBe('Campo obrigatorio')
        expect(passwordStatus.title).toBe('Campo obrigatorio')
        
        expect(emailStatus.textContent).toBe('🔴')
        expect(passwordStatus.textContent).toBe('🔴')
    })

    it('Should call validation with correct email', () => {
        const { sut, validationSpy } = makeSut()
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: 'any_email' } })
        
        expect(validationSpy.fieldName).toEqual('email')
        expect(validationSpy.filedValue).toEqual('any_email')
    })

    it('Should call validation with correct password', () => {
        const { sut, validationSpy } = makeSut()
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: 'any_password' } })
        
        expect(validationSpy.fieldName).toEqual('password')
        expect(validationSpy.filedValue).toEqual('any_password')
    })
})