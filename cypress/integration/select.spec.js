describe('Select Component', () => {
	beforeEach(() => {
		cy.visit('/select')
	})

	it('should show the option values', () => {
		cy.getBySel('demoForm')
			.getByName('blog')
			.click()
			.getBySel('blog-bg')
			.type('{esc}', { force: true })
			.getByName('tags')
			.click()
			.getBySel('tags-options')
			.type('{esc}')
	})
})
