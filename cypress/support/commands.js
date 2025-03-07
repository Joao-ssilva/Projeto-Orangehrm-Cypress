Cypress.Commands.add('fazerLogin', (user, senha) => {
    cy.visit('/')
    
    cy.get('input[name="username"]').type(user)
    cy.get('input[type="password"]').type(senha)

    cy.contains('button', 'Login').click()

    cy.get('.oxd-userdropdown-tab')
        .should('be.visible')
})

Cypress.Commands.add('acessarModulo', (nameMod) => {
    cy.get('.oxd-main-menu-item').contains(nameMod).click() 
    cy.get('.oxd-topbar-body-nav-tab').contains('Employee List').click()
})

Cypress.Commands.add('criarNovoEmployeeSemLogin', (fristName, middleName, lastname, id) => {

    cy.get('.oxd-button').contains('Add').click();
    
    cy.get('input[placeholder="First Name"]').type(fristName)
    cy.get('input[placeholder="Middle Name"]').type(middleName)
    cy.get('input[placeholder="Last Name"]').type(lastname)
    
    cy.get('.oxd-input-group:has(.oxd-label:contains("Employee Id"))')
        .find('input')
        .should('be.visible')
        .clear()
        .type(id);
    cy.contains('button', 'Save').click()
    cy.contains('Successfully Saved')
    .should('be.visible')
})