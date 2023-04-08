describe('Select Component', () => {
	beforeEach(() => {
		cy.visit('/select')
	})

	it('should allow to select a single option', () => {
		cy.getByTestId('demoForm').within(() => cy.getByName('blog').click())
		cy.getByTestId('blog-bg').type('{esc}', { force: true })
	})

	it('should allow to select multiple options', () => {
		cy.getByTestId('demoForm').within(() => cy.getByName('tags').click())
		cy.getByTestId('tags-options').type('{esc}')
	})
})
