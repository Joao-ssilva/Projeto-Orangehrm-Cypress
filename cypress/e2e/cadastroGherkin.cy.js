/// <reference types="cypress" />
import { employee } from '../e2e/elements/datas'

describe('Cadastro de "Employee"', () => {

    context.only('Validar a existência do botão "+ Add"', () => {
   
        it('Dado que o usuário está logado no OrangeHRM', () => {
            cy.fazerLogin(employee.userName,employee.senha)
        })
    
        it('E acessa o módulo "PIM"', () => {
            cy.acessarModulo('PIM')
        })
    
        it('Quando visualiza a página de Employee List', () => {
            cy.get('li.oxd-topbar-body-nav-tab.--visited a')
            .contains('Employee List')
            .should('be.visible').click()
              
        })
    
        it('Então ele deve ver o botão "+ Add" disponível na tela', () => {
            cy.get('.oxd-topbar-body-nav-tab.--visited')
            .should('contain.text', 'Employee List') 
            .should('be.visible')
            cy.get('.oxd-topbar-body-nav-tab.--visited')
            .should('have.class', '--visited')
        })
        after(() => {
            cy.clearLocalStorage()
            cy.clearCookies()
        })
    })

    context('Cadastrar um Employee sem dados de login', () => {
        
        it('Dado que o usuário está na tela de cadastro de Employee', () => {
            cy.fazerLogin(employee.userName, employee.senha)
            cy.acessarModulo('PIM')
            cy.get('.oxd-button').contains('Add').click()
        })

        it('E preenche os campos obrigatórios "First Name", "Last Name" e "Employee ID"', () => {
            cy.get('input[placeholder="First Name"]').type(employee.firstName)
            cy.get('input[placeholder="Middle Name"]').type(employee.middleName)
            cy.get('input[placeholder="Last Name"]').type(employee.lastName)
            
            cy.get('.oxd-input-group:has(.oxd-label:contains("Employee Id"))')
            .find('input')
            .should('be.visible')
                .clear()
                .type(employee.id)
        })
        
        it('E não marca a opção "Create Login Details"', () => {
            cy.get('input[type="checkbox"]').should('not.be.checked')
        })
        
        it('Quando clica no botão "Save"', () => {
            cy.contains('button', 'Save').click()
        })

        it('Então o sistema deve cadastrar o Employee com sucesso', () => {
            cy.contains('Successfully Saved')
            .should('be.visible')
        })
        
        it('E não deve criar credenciais de login para o novo usuário', () => {
            cy.get('.orangehrm-tabs-item.--active')
            .should('be.visible')
            .and('contain', 'Personal Details')
        })

        after(() => {
            cy.clearLocalStorage()
            cy.clearCookies()
        })
    })
    
    context('Acessar a tela de cadastro de usuário clicando no botão "+ Add"', () => {
        
        it('Dado que o usuário está logado no OrangeHRM', () => {
            cy.fazerLogin(employee.userName, employee.senha)
        })
        
        it('E acessa o módulo "PIM"', () => {
            cy.acessarModulo('PIM')
        })
        
        it('Quando clica no botão "+ Add"', () => {
            cy.get('li.oxd-topbar-body-nav-tab.--visited a')
            .contains('Employee List')
            .should('be.visible').click()
            cy.get('button').contains('Add').click()
        })
        
        it('Então ele deve ser redirecionado para a tela de cadastro de Employee', () => {
            cy.get('li.oxd-topbar-body-nav-tab.--visited a')
            .should('contain.text', 'Add Employee') 
            .should('be.visible').click()
            cy.get('.oxd-topbar-body-nav-tab.--visited')
            .should('have.class', '--visited')
            
        })
        
        it('E o formulário de cadastro deve aparecer na tela', () => {
            cy.get('form.oxd-form').should('be.visible')
        })

        after(() => {
            cy.clearLocalStorage()
            cy.clearCookies()
        })
    })
    
    context('Tentar cadastrar um usuário sem preencher o nome.', () => {
       
        it('Dado que o usuário está na tela de cadastro de Employee', () => {
            cy.fazerLogin(employee.userName, employee.senha)
            cy.acessarModulo('PIM')
            cy.get('.oxd-button').contains('Add').click()
        })
        
        it('E preenche os campos "Middle Name" e "Last Name"', () => {
            cy.get('input[placeholder="Middle Name"]').type(employee.middleName)
            cy.get('input[placeholder="Last Name"]').type(employee.lastName)
        })
        
        it('E preenche o campo "Employee ID"', () => {
            cy.get('.oxd-input-group:has(.oxd-label:contains("Employee Id"))')
            .find('input')
            .should('be.visible').type(employee.id)
        })
    
        it('E deixa o campo "First Name" em branco', () => {
            cy.get('input[placeholder="First Name"]').should('be.empty')
        })
    
        it('Quando clica no botão "Save"', () => {
            cy.contains('button', 'Save').click()
        })
    
        it('Então o sistema deve exibir a mensagem de erro "Required" abaixo do campo "First Name"', () => {
            cy.get('.oxd-input-field-error-message')
            .should('be.visible')
            .and('contain', 'Required')
        })

        after(() => {
            cy.clearLocalStorage()
            cy.clearCookies()
        })
    })
    
    context('Validar tentativa de cadastro com "Employee ID" já existente', () => {
        
        it('Dado que o usuário está na tela de cadastro de Employee', () => {
            cy.fazerLogin(employee.userName, employee.senha)
            cy.acessarModulo('PIM')
            cy.get('.oxd-button').contains('Add').click()
        })
        
        it('E preenche os campos "Middle Name" e "Last Name"', () => {
            cy.get('input[placeholder="First Name"]').type(employee.firstName)
            cy.get('input[placeholder="Middle Name"]').type(employee.middleName)
            cy.get('input[placeholder="Last Name"]').type(employee.lastName)
        })
        
        it(`E insere um Employee ID já existente ${employee.id}`, () => {
            cy.get('.oxd-input-group:has(.oxd-label:contains("Employee Id"))')
                .find('input')
                .should('be.visible')
                .clear()
                .type(employee.id)
            })
            
            it('Quando clica no botão "Save"', () => {
            cy.contains('button', 'Save').click()
        })
        
        it('Então o sistema deve exibir uma mensagem de erro informando que o Employee ID já existe', () => {
            cy.get('.oxd-input-field-error-message')
            .should('be.visible')
            .and('contain', 'Employee Id already exists')
        })
        
        after(() => {
            cy.clearLocalStorage()
            cy.clearCookies()
        })
    })
})  
