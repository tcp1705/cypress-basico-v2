/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE,'
        cy.get('#firstName').type('Tobias')
        cy.get('#lastName').type('Pecanha')
        cy.get('#email').type('tobiaspecanha2014@hotmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('.button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Tobias')
        cy.get('#lastName').type('Pecanha')
        cy.get('#email').type('tobiaspecanha2014.hotmail.com')
        cy.get('#open-text-area').type('teste')
        cy.get('.button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('valida valor não-numerico', function() {
        cy.get('#phone').type('abcdef')
        
        cy.get('input#phone').should('have.value', '')  
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Tobias')
        cy.get('#lastName').type('Pecanha')
        cy.get('#email').type('tobiaspecanha2014@hotmail.com')
        cy.get('#open-text-area').type('teste')
        cy.get('#phone-checkbox').check()
        cy.get('.button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Tobias')
            .should('have.value', 'Tobias')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Pecanha')
            .should('have.value', 'Pecanha')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('tobiaspecanha2014@hotmail.com')
            .should('have.value', 'tobiaspecanha2014@hotmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('35998696960')
            .should('have.value', '35998696960')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('.button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('exercicio 8', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
            .select('youtube')
            .should('have.value', 'youtube')

    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"]')
            .check('feedback')
            .should('have.value', 'feedback')
    })

    it('marca e verifica atendimentos', function(){
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio){
                cy.get($radio).check()
                cy.get($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })

    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('@sampleFile')
            .should(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
    })

})