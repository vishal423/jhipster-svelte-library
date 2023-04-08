// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

Cypress.Commands.add('unregisterServiceWorkers', () => {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
			.getRegistrations()
			.then(registrations => registrations.forEach(reg => reg.unregister()))
	}
})

Cypress.Commands.add('getByTestId', (selector, ...args) => {
	return cy.get(`[data-testid=${selector}]`, ...args)
})

Cypress.Commands.add('getByName', selector => {
	return cy.get(`[name=${selector}]`)
})

Cypress.Commands.add('setFileInput', (fieldSelector, testFile, mimeType) => {
	cy.fixture(testFile).then($blob => {
		cy.getByName(fieldSelector).then($el => {
			const blob = Cypress.Blob.base64StringToBlob($blob, mimeType)
			const file = new File([blob], testFile, { type: mimeType })
			const list = new DataTransfer()
			list.items.add(file)
			$el[0].files = list.files
			$el[0].dispatchEvent(new Event('change'))
		})
	})
})
