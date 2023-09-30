import { jest } from '@jest/globals'
import { fireEvent, render } from '@testing-library/svelte'

import { screen } from '@testing-library/dom'
import DeleteModal from './delete-modal.svelte'

it('should display the delete dialog title and buttons', () => {
	render(DeleteModal, {
		props: {
			id: 1,
		},
	})

	expect(screen.getByRole('heading')).toHaveTextContent('Confirm delete operation')
	expect(screen.queryByRole('button', { name: /cancel/i })).toBeVisible()
	expect(screen.queryByRole('button', { name: /delete/i })).toBeVisible()
})

it('should dispatch delete event', async () => {
	const { component } = render(DeleteModal, {
		props: {
			id: 11,
		},
	})

	const button = screen.getByRole('button', { name: /delete/i })

	const mockHandler = jest.fn()
	component.$on('delete', mockHandler)

	fireEvent.click(button)

	expect(mockHandler).toHaveBeenCalled()
	expect(mockHandler.mock.calls[0][0].detail).toStrictEqual({
		id: 11,
	})
})

it('should dispatch close event', async () => {
	const { component } = render(DeleteModal, {
		props: {
			id: 11,
		},
	})

	const button = screen.getByRole('button', { name: /cancel/i })

	const mockHandler = jest.fn()
	component.$on('close', mockHandler)

	fireEvent.click(button)

	expect(mockHandler).toHaveBeenCalled()
	expect(mockHandler.mock.calls[0][0].detail).toBeNull()
})
