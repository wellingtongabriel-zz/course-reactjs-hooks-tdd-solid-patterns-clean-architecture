import React from 'react'
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react'
import { AuthenticationSpy, ValidationStub } from '@/presentation/test'
import Login from './login'
import faker from 'faker'
import 'jest-localstorage-mock'
import { InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
    sut: RenderResult
    authenticationSpy: AuthenticationSpy
}

type SutParams = {
    validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub()
    const authenticationSpy = new AuthenticationSpy()

    validationStub.errorMessage = params?.validationError
    const sut = render(<Login validation={validationStub} authentication={authenticationSpy} />)
    return { sut, authenticationSpy }
}

const simulateValidSubmit = (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): void => {
    populateEmailField(sut, email)
    populatePasswordField(sut, password)
    
    const submitButton = sut.getByTestId('submit')
    fireEvent.click(submitButton)
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })
}
const simulateStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
    const emailStatus = sut.getByTestId(`${fieldName}-status`)
    expect(emailStatus.title).toEqual(validationError || 'Tudo certo!')
    expect(emailStatus.textContent).toEqual(validationError ? '🔴' : '🟢')
}


describe('Login Component', () => {

    afterEach(cleanup)

    beforeEach(() => {
        localStorage.clear()
    })

    it('Should start with initial state', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        
        const errorWrap = sut.getByTestId('error-wrap')
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        const passwordStatus = sut.getByTestId('password-status')
        
        expect(errorWrap.childElementCount).toBe(0)
        expect(submitButton.disabled).toBe(true)

        expect(passwordStatus.title).toBe(validationError)
        
        simulateStatusForField(sut, 'email', validationError)
        simulateStatusForField(sut, 'password', validationError)
    })

    it('Should show email error is validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        
        populateEmailField(sut)
        simulateStatusForField(sut,'email', validationError)
    })

    it('Should show password error is validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        
        populatePasswordField(sut)
        simulateStatusForField(sut, 'password', validationError)
    })

    it('Should show valid password state if validation succeds', () => {
        const { sut } = makeSut()
        populatePasswordField(sut, faker.internet.password())
        simulateStatusForField(sut, 'password')
    })

    it('Should show valid email state if validation succeds', () => {
        const { sut } = makeSut()
        populateEmailField(sut)
        simulateStatusForField(sut, 'email')
    })

    it('Should enable submit button if form is valid', () => {
        const { sut } = makeSut()
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        
        populateEmailField(sut)
        populatePasswordField(sut)

        expect(submitButton.disabled).toEqual(false)
    })

    it('Should show spinner on submit', () => {
        const { sut } = makeSut()
        const email = faker.internet.email()
        const password = faker.internet.password() 

        simulateValidSubmit(sut, email, password)

        const spinner = sut.getByTestId('spinner')

        expect(spinner).toBeTruthy()
    })

    it('Should call authentication with correct values', () => {
        const { sut, authenticationSpy } = makeSut()
        const email = faker.internet.email()
        const password = faker.internet.password() 

        simulateValidSubmit(sut, email, password)

        expect(authenticationSpy.params).toEqual({ email, password })
    })

    it('Should call authentication only once', () => {
        const { sut, authenticationSpy } = makeSut()
        simulateValidSubmit(sut)
        simulateValidSubmit(sut)
        expect(authenticationSpy.callsCount).toBe(1);
    })

    it('Should not call authentication if form is invalid', () => {
        const validationError = faker.random.words()
        const { sut, authenticationSpy } = makeSut({ validationError })
        
        populateEmailField(sut)
        fireEvent.submit(sut.getByTestId('form'))

        expect(authenticationSpy.callsCount).toBe(0);
    })

    it('Should present erro if authentication fails', async () => {
        const { sut, authenticationSpy } = makeSut()
        const error = new InvalidCredentialsError()
        jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
        
        simulateValidSubmit(sut);
        const errorWrap = sut.getByTestId('error-wrap')
        await waitFor(() => errorWrap)
        const mainError = sut.getByTestId('main-error')

        expect(mainError.textContent).toBe(error.message);
        expect(errorWrap.childElementCount).toBe(1)
    })

    it('Should add accessToken to localstorage on success', async () => {
        const { sut, authenticationSpy } = makeSut()
        simulateValidSubmit(sut);
        await waitFor(() => sut.getByTestId('form'))
        expect(localStorage.setItem).toHaveBeenLastCalledWith('accessToken', authenticationSpy.account.accessToken);
    })
})