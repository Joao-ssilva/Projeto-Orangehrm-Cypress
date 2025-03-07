/// <reference types="cypress" />
import { employee } from '../e2e/elements/datas'

describe('Módulo "PIM"', () => {

    context.only('Pesquisar o módulo "PIM"', () => {

        it('Dado que o usuário está logado no OrangeHRM', () => {
            cy.fazerLogin(employee.userName, employee.senha)
        })

        it('Quando ele digita "PIM" na barra de pesquisa do menu', () => {
            cy.get('input[placeholder="Search"]')
            .type('PIM')
        })

        it('Então o sistema deve exibir o módulo "PIM" como resultado da pesquisa', () => {
            cy.get('a.oxd-main-menu-item')
                .should('be.visible')
                .and('contain.text', 'PIM')
            })
                after(() => {
            cy.clearLocalStorage()
            cy.clearCookies()
        })
        
        after(() => {
            cy.clearLocalStorage()
            cy.clearCookies()
        })    
    })
    
    context('Pesquisar um módulo diferente de "PIM"', () => {

        it('Dado que o usuário está logado no OrangeHRM', () => {
            cy.fazerLogin(employee.userName,employee.senha)
        })

        it('E está na página inicial do sistema', () => {
            cy.contains('header', 'Dashboard').should('be.visible')
        })

        it('Quando ele digita "Claim" na barra de pesquisa do menu', () => {
            cy.get('input[placeholder="Search"]')
            .type('Claim')
        })

        it('Então o sistema deve exibir o módulo "Claim" como resultado da pesquisa', () => {
            cy.get('a.oxd-main-menu-item')
                .should('be.visible')
                .and('contain.text', 'Claim')
        })

        after(() => {
            cy.clearLocalStorage()
            cy.clearCookies()
        })
    })

    context('Pesquisar e apagar a pesquisa do módulo "Claim"', () => {

        it(' Dado que o usuário está logado no OrangeHRM', () => {
            cy.fazerLogin(employee.userName, employee.senha)
        })

        it('E que ele digitou "Claim" na barra de pesquisa do menu', () => {
            cy.get('input[placeholder="Search"]').type('Claim')
        })

        it('E que o resultado da pesquisa exibe apenas o módulo "Claim"', () => {
            cy.get('.oxd-main-menu').find('a.oxd-main-menu-item')
                .should('have.length', 1)
                .and('contain.text', 'Claim')
        })

        it('Quando ele limpa o campo de pesquisa', () => {
            cy.get('input[placeholder="Search"]').clear()
        })

        it('Então o sistema deve exibir novamente todos os módulos disponíveis no menu no menu', () => {
            cy.get('.oxd-main-menu').find('a.oxd-main-menu-item')
                .should('have.length.greaterThan', 1)
        })
        after(() => {
            cy.clearLocalStorage()
            cy.clearCookies()
        })
    })

    context('Acessar o módulo "PIM"', () => {
        
        it('Dado que o usuário está logado no OrangeHRM', () => {
            cy.fazerLogin(employee.userName, employee.senha)
        })
        
        it('E está na página inicial do sistema (validamos pelo Dashboard)"', () => {
            cy.contains('header', 'Dashboard').should('be.visible')
        })

        it('Quando ele clica no menu lateral', () => {
            cy.get('.oxd-main-menu').should('be.visible')
        })
        
        it('E seleciona a opção "PIM"', () => {
            cy.get('.oxd-main-menu-item').contains('PIM').click()
        })
        it('Então ele deve ser redirecionado para a página do módulo "PIM"', () => {
            cy.get('.oxd-main-menu-item.active')
                .should('contain.text', 'PIM')
            })
            
        it('E o fundo do item "PIM" deve estar na cor laranja ou uma cor de fundo, identifcado que esta ativo', () => {
            cy.get('.oxd-main-menu-item.active')
            .contains('PIM')
            .should('be.visible')
            
        })
        after(() => {
            cy.clearLocalStorage()
            cy.clearCookies()
        })
    })
})
