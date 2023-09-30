import { jest } from '@jest/globals'
import { render, fireEvent } from '@testing-library/svelte'
import { screen } from '@testing-library/dom'

import Password from './password.svelte'

test('should display valid password control', async () => {
	const { component } = render(Password, {
		props: {
			id: 'password',
			value: 'someValue',
		},
	})

	const mockHandler = jest.fn()
	component.$on('validate', mockHandler)

	const passwordInput = screen.getByLabelText(/password/i)

	fireEvent.input(passwordInput, { target: { value: 'newValue' } })

	expect(passwordInput).toHaveValue('newValue')

	expect(mockHandler).toHaveBeenCalled()
	expect(mockHandler.mock.calls[0][0].detail).toStrictEqual({
		valid: true,
		message: undefined,
	})
})

test('should validate password control default required constraint', async () => {
	const { component } = render(Password, {
		props: {
			id: 'password',
			value: 'someLongValue',
		},
	})

	const mockHandler = jest.fn()
	component.$on('validate', mockHandler)

	const passwordInput = screen.getByLabelText(/password/i)

	fireEvent.input(passwordInput, { target: { value: '' } })

	expect(passwordInput).toHaveValue('')

	expect(mockHandler).toHaveBeenCalled()
	expect(mockHandler.mock.calls[0][0].detail).toStrictEqual({
		valid: false,
		message: 'Password is mandatory',
	})
})

test('should validate password control custom required constraint message', async () => {
	const { component } = render(Password, {
		props: {
			id: 'password',
			value: 'someLongValue',
			validations: [{ type: 'required', message: 'Password is mandatory field' }],
		},
	})

	const mockHandler = jest.fn()
	component.$on('validate', mockHandler)

	const passwordInput = screen.getByLabelText(/password/i)

	fireEvent.input(passwordInput, { target: { value: '' } })

	expect(passwordInput).toHaveValue('')

	expect(mockHandler).toHaveBeenCalled()
	expect(mockHandler.mock.calls[0][0].detail).toStrictEqual({
		valid: false,
		message: 'Password is mandatory field',
	})
})

test('should validate password control default minimum length constraint', async () => {
	const { component } = render(Password, {
		props: {
			id: 'password',
			value: 'someLongValue',
		},
	})

	const mockHandler = jest.fn()
	component.$on('validate', mockHandler)

	const passwordInput = screen.getByLabelText(/password/i)

	fireEvent.input(passwordInput, { target: { value: 'ab' } })

	expect(passwordInput).toHaveValue('ab')

	expect(mockHandler).toHaveBeenCalled()
	expect(mockHandler.mock.calls[0][0].detail).toStrictEqual({
		valid: false,
		message: 'Password is required to be at least 4 characters long',
	})
})

test('should validate password control custom minimum length constraint message', async () => {
	const { component } = render(Password, {
		props: {
			id: 'password',
			value: 'someLongValue',
			validations: [
				{
					type: 'minlength',
					minlength: 2,
					message: 'Password is required to be at least 2 characters long',
				},
			],
		},
	})

	const mockHandler = jest.fn()
	component.$on('validate', mockHandler)

	const passwordInput = screen.getByLabelText(/password/i)

	fireEvent.input(passwordInput, { target: { value: 'a' } })

	expect(passwordInput).toHaveValue('a')

	expect(mockHandler).toHaveBeenCalled()
	expect(mockHandler.mock.calls[0][0].detail).toStrictEqual({
		valid: false,
		message: 'Password is required to be at least 2 characters long',
	})
})

test('should validate password control default maximum length constraint', async () => {
	const { component } = render(Password, {
		props: {
			id: 'password',
			value: 'someLongValue',
		},
	})

	const mockHandler = jest.fn()
	component.$on('validate', mockHandler)

	const passwordInput = screen.getByLabelText(/password/i)

	fireEvent.input(passwordInput, {
		target: {
			value: 'loremipsumloremipsumloremipsumloremipsumloremipsumloremipsum',
		},
	})

	expect(passwordInput).toHaveValue(
		'loremipsumloremipsumloremipsumloremipsumloremipsumloremipsum'
	)

	expect(mockHandler).toHaveBeenCalled()
	expect(mockHandler.mock.calls[0][0].detail).toStrictEqual({
		valid: false,
		message: 'Password cannot be longer than 50 characters',
	})
})

test('should validate password control custom maximum length constraint message', async () => {
	const { component } = render(Password, {
		props: {
			id: 'password',
			value: 'val',
			validations: [
				{
					type: 'maxlength',
					maxlength: 5,
					message: 'Password cannot be longer than 5 characters',
				},
			],
		},
	})

	const mockHandler = jest.fn()
	component.$on('validate', mockHandler)

	const passwordInput = screen.getByLabelText(/password/i)

	fireEvent.input(passwordInput, { target: { value: 'loremipsum' } })

	expect(passwordInput).toHaveValue('loremipsum')

	expect(mockHandler).toHaveBeenCalled()
	expect(mockHandler.mock.calls[0][0].detail).toStrictEqual({
		valid: false,
		message: 'Password cannot be longer than 5 characters',
	})
})
