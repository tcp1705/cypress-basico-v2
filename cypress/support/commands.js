Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Tobias')
    cy.get('#lastName').type('Pecanha')
    cy.get('#email').type('tobiaspecanha2014@hotmail.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
})