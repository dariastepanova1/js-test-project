/// <reference types="cypress" />

describe('registration for qauto site', ()=> {
  it('should register a new user', () => {
    cy.visit('', {auth: {username: 'guest', password: 'welcome2qauto'}})
    cy.contains('Sign In').click()
    cy.contains('Registration').click() 
    cy.get('#signupName').type('testusername')
    cy.get('#signupLastName').type('testuserlastname')
    cy.get('#signupEmail').type(`testuser${Math.floor(Math.random() * 1000)}@test.com`) 
    cy.get('#signupPassword').type('Qwerty123!')
    cy.get('#signupRepeatPassword').type('Qwerty123!')
    cy.contains('Register').click()
    cy.url().should('include', '/garage')
  })
})