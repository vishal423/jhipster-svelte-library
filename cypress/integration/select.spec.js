describe('Select Component', () => {
	beforeEach(() => {
		cy.visit('/select')
	})

	it('should allow to select a single option', () => {
		cy.getByTestId('demoForm')
			.getByName('blog')
			.click()
			.getByTestId('blog-bg')
			.type('{esc}', { force: true })
	})

	it('should allow to select multiple options', () => {
		cy.getByTestId('demoForm')
			.getByName('tags')
			.click()
			.getByTestId('tags-options')
			.type('{esc}')
	})
})
