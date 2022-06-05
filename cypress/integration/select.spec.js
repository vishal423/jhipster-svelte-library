describe('Select Component', () => {
	beforeEach(() => {
		cy.visit('/select')
	})

	it('should allow to select a single option', () => {
		cy.getBySel('demoForm')
			.getByName('blog')
			.click()
			.getBySel('blog-bg')
			.type('{esc}', { force: true })
	})

	it('should allow to select multiple options', () => {
		cy.getBySel('demoForm')
			.getByName('tags')
			.click()
			.getBySel('tags-options')
			.type('{esc}')
	})
})
