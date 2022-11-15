describe('visiting and viewing the page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/**', {fixture: 'urls'}).as('retrieved-urls')
    cy.intercept('POST', 'http://localhost:3001/**', {fixture: 'post'}).as('posted-success')
    cy.visit('http://localhost:3000/')
  })

  it('shows the user the page title and the existing shortened URLs', () => {
    cy.contains('URL Shortener').should('be.visible')
    cy.get('section').children('.url').should('be.visible')
    cy.get('section').children('.url').first().should('include.text', 'https://muchshorter.io')
  })

  it('shows the user a form with two inputs and a button', () => {
    cy.get('[placeholder="Title..."]').should('be.visible')
    cy.get('[placeholder="URL to Shorten..."]').should('be.visible')
    cy.get('button').should('be.visible')
  })

  it('has a form that is fillable- the input fields update with what the user enters', () => {
    cy.get('[placeholder="Title..."]').type('this is a test')
    cy.get('[placeholder="Title..."]').should('have.value', 'this is a test')
    cy.get('[placeholder="URL to Shorten..."]').type('here is another test')
    cy.get('[placeholder="URL to Shorten..."]').should('have.value', 'here is another test')

  })
})

describe('submitting a new url', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/**', {fixture: 'urls'}).as('retrieved-urls')
    cy.intercept('POST', 'http://localhost:3001/**', {fixture: 'post'}).as('posted-success')
    cy.visit('http://localhost:3000/')
  })

  it('renders the new shortened url entered by a user', () => {
    cy.get('[placeholder="Title..."]').type('Cypress')
    cy.get('[placeholder="URL to Shorten..."]').type('https://docs.cypress.io/api/commands/children#Arguments')
    cy.get('button').click()
  })
  
})

describe('user sad paths', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/**', {fixture: 'urls'}).as('retrieved-urls')
    cy.intercept('POST', 'http://localhost:3001/**', {fixture: 'post'}).as('posted-success')
    cy.visit('http://localhost:3000/')
  })

  it('does not allow the user to click the submit button unless both form fields are completed', () => {
    cy.get('[placeholder="Title..."]').type('Cypress')
    cy.get('button').should('be.disabled')
  })
  
})