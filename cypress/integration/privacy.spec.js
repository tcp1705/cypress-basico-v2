    it('testa a página da política de privavidade de forma independente', function(){
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Test').should('be.visible')
        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
    })