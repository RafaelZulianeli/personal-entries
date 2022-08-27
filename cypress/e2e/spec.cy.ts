describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.get('.content span').contains('personal-entries start!')
  })
})
