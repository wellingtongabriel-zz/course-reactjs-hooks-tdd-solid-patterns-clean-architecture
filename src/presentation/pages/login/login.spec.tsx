import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import { ValidationStub } from '@/presentation/test'
import faker from 'faker'

import Login from './login'

type SutTypes = {
    sut: RenderResult
}

type SutParams = {
    validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub()
    validationStub.errorMessage = params?.validationError
    const sut = render(<Login validation={validationStub} />)
    return { sut }
}

describe('Login Component', () => {

    afterEach(cleanup)

    it('Should start with initial state', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        
        const errorWrap = sut.getByTestId('error-wrap')
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        const emailStatus = sut.getByTestId('email-status')
        const passwordStatus = sut.getByTestId('password-status')
        
        expect(errorWrap.childElementCount).toBe(0)
        expect(submitButton.disabled).toBe(true)

        expect(emailStatus.title).toBe(validationError)
        expect(passwordStatus.title).toBe(validationError)
        
        expect(emailStatus.textContent).toBe('🔴')
        expect(passwordStatus.textContent).toBe('🔴')
    })

    it('Should show email error is validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        const emailInput = sut.getByTestId('email')

        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
        const emailStatus = sut.getByTestId('email-status')

        expect(emailStatus.title).toEqual(validationError)
        expect(emailStatus.textContent).toEqual('🔴')
    })

    it('Should show password error is validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        const passwordInput = sut.getByTestId('password')

        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
        const passwordStatus = sut.getByTestId('password-status')

        expect(passwordStatus.title).toEqual(validationError)
        expect(passwordStatus.textContent).toEqual('🔴')
    })

    it('Should show valid password state if validation succeds', () => {
        const { sut } = makeSut()
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
        const passwordStatus = sut.getByTestId('password-status')

        expect(passwordStatus.title).toEqual('Tudo certo!')
        expect(passwordStatus.textContent).toEqual('🟢')
    })

    it('Should show valid email state if validation succeds', () => {
        const { sut } = makeSut()
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
        const emailStatus = sut.getByTestId('email-status')

        expect(emailStatus.title).toEqual('Tudo certo!')
        expect(emailStatus.textContent).toEqual('🟢')
    })

    it('Should enable submit button if form is valid', () => {
        const { sut } = makeSut()
        const emailInput = sut.getByTestId('email')
        const passwordInput = sut.getByTestId('password')

        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

        const submitButton = sut.getByTestId('submit') as HTMLButtonElement

        expect(submitButton.disabled).toEqual(false)
    })

    it('Should show spinner on submit', () => {
        const { sut } = makeSut()
        const emailInput = sut.getByTestId('email')
        const passwordInput = sut.getByTestId('password')

        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

        const submitButton = sut.getByTestId('submit')
        fireEvent.click(submitButton)

        const spinner = sut.getByTestId('spinner')

        expect(spinner).toBeTruthy()
    })
})