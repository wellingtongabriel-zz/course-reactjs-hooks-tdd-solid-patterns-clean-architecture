import React from 'react'
import { render } from '@testing-library/react'
import Login from './login'

describe('Login Component', () => {
    it('Should start with initial state', () => {
        const { getByTestId } = render(<Login />)
        
        const errorWrap = getByTestId('error-wrap')
        const submitButton = getByTestId('submit') as HTMLButtonElement
        const emailStatus = getByTestId('email-status')
        const passwordStatus = getByTestId('password-status')
        
        expect(errorWrap.childElementCount).toBe(0)
        expect(submitButton.disabled).toBe(true)

        expect(emailStatus.title).toBe('Campo obrigatorio')
        expect(passwordStatus.title).toBe('Campo obrigatorio')
        
        expect(emailStatus.textContent).toBe('🔴')
        expect(passwordStatus.textContent).toBe('🔴')
    })
})