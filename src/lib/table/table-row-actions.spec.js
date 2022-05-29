import '@testing-library/jest-dom/extend-expect'
import { jest } from '@jest/globals'
import { render, fireEvent } from '@testing-library/svelte'
import { screen } from '@testing-library/dom'

import TableRowActions from './table-row-actions.svelte'

test('should assert the action buttons are hidden ', () => {
	render(TableRowActions, {
		props: {
			id: 1,
		},
	})

	expect(screen.getByTestId('rowactions')).toHaveClass('hidden')
})

test('should not render state change actions', () => {
	render(TableRowActions, {
		props: {
			id: 1,
			renderStateChangeActions: false,
		},
	})

	expect(screen.getByTestId('rowactions')).toHaveClass('hidden')
	expect(
		screen.queryByRole('button', { name: /edit/i })
	).not.toBeInTheDocument()
	expect(
		screen.queryByRole('button', { name: /delete/i })
	).not.toBeInTheDocument()
})

test('should disable state change actions', () => {
	render(TableRowActions, {
		props: {
			id: 1,
			disableStateChangeActions: true,
		},
	})

	expect(screen.getByTestId('rowactions')).toHaveClass('hidden')
	expect(screen.getByRole('button', { name: /edit/i })).toBeDisabled()
	expect(screen.getByRole('button', { name: /delete/i })).toBeDisabled()
})

test('should dispatch the view event', async () => {
	const { component } = render(TableRowActions, {
		props: {
			id: 1,
			visible: true,
		},
	})
	const button = screen.getByRole('button', { name: /view/i })

	const mockHandler = jest.fn()
	component.$on('view', mockHandler)

	await fireEvent.click(button)

	expect(mockHandler).toHaveBeenCalled()
	expect(mockHandler.mock.calls[0][0].detail).toStrictEqual({
		id: 1,
	})
})

test('should dispatch the update event', async () => {
	const { component } = render(TableRowActions, {
		props: {
			id: 1,
			visible: true,
		},
	})
	const button = screen.getByRole('button', { name: /edit/i })

	const mockHandler = jest.fn()
	component.$on('update', mockHandler)

	await fireEvent.click(button)

	expect(mockHandler).toHaveBeenCalled()
	expect(mockHandler.mock.calls[0][0].detail).toStrictEqual({
		id: 1,
	})
})

test('should dispatch the delete event', async () => {
	const { component } = render(TableRowActions, {
		props: {
			id: 1,
			visible: true,
		},
	})
	const button = screen.getByRole('button', { name: /delete/i })

	const mockHandler = jest.fn()
	component.$on('delete', mockHandler)

	await fireEvent.click(button)

	expect(mockHandler).toHaveBeenCalled()
	expect(mockHandler.mock.calls[0][0].detail).toStrictEqual({
		id: 1,
	})
})
