import '@testing-library/jest-dom/extend-expect'
import { jest } from '@jest/globals'
import { render, fireEvent } from '@testing-library/svelte'
import { screen } from '@testing-library/dom'

import PasswordConfirm from './password-confirm.svelte'

test('should display valid password confirm control', async () => {
	const { component } = render(PasswordConfirm, {
		props: {
			value: 'someValue',
		},
	})

	const mockHandler = jest.fn()
	component.$on('validate', mockHandler)

	const passwordInput = screen.getByLabelText(/^password/i)

	await fireEvent.input(passwordInput, { target: { value: 'newValue' } })

	expect(passwordInput).toHaveValue('newValue')

	const confirmPasswordInput = screen.getByLabelText(/^confirm password/i)

	await fireEvent.input(confirmPasswordInput, {
		target: { value: 'newValue' },
	})

	expect(confirmPasswordInput).toHaveValue('newValue')

	expect(mockHandler).toHaveBeenCalled()
	expect(mockHandler.mock.calls[5][0].detail).toStrictEqual({
		valid: true,
	})
})
