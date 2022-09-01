describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.get('.pe-toolbar__title').contains('Meus Lançamentos')
  })
})
