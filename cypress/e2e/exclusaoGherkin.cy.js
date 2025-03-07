/// <reference types="cypress" />
import { employee } from '../e2e/elements/datas'
import { faker } from '@faker-js/faker'


describe('Exclusão de Employee no módulo PIM do OrangeHRM', () => {

    context.only('Clicar no ícone de lixeira e cancelar a exclusão, garantindo que o employee não foi excluído', () => {
        const dataEmployeeLocal = {
            firstNameLocal: faker.person.firstName(),
            middleNameLocal: faker.person.middleName(),
            lastNameLocal: faker.person.lastName(),
            idLocal: Math.floor(100000 + Math.random() * 900000)
        }  

        it('Dado que o usuário está logado no OrangeHRM e acessa o módulo "PIM"', () => {
            cy.fazerLogin(employee.userName, employee.senha)
            cy.acessarModulo('PIM')
        })
        
        it(`E cria um Employee "${dataEmployeeLocal.firstNameLocal} ${dataEmployeeLocal.middleNameLocal}"`, () => {
            cy.criarNovoEmployeeSemLogin(
                dataEmployeeLocal.firstNameLocal, 
                dataEmployeeLocal.middleNameLocal,
                dataEmployeeLocal.lastNameLocal,
                dataEmployeeLocal.idLocal
            )
        })
        
        it('E volta para a página "Employee List"', () => {
            cy.contains('Employee List').click()
        })
        
        it(`Então pesquisa o employee "${dataEmployeeLocal.firstNameLocal} ${dataEmployeeLocal.middleNameLocal}" cadastrado`, () => {
            cy.get('.oxd-input-group')
                .filter(':has(.oxd-label:contains("Employee Name"))')
                .find('input')
                .type(`${dataEmployeeLocal.firstNameLocal} ${dataEmployeeLocal.middleNameLocal}`)
            cy.get('.oxd-table-card')
            .should('be.visible')
            cy.contains('button', 'Search').click()
        })
        
        it(`Quando o usuário clica no ícone de lixeira ao lado do nome do employee "${dataEmployeeLocal.firstNameLocal} ${dataEmployeeLocal.middleNameLocal}"`, () => {
            cy.get('.oxd-table-card')
            .should('be.visible')
            cy.contains(`${dataEmployeeLocal.firstNameLocal}`) 
            cy.get('.oxd-table-cell-actions')
            .find('.oxd-icon.bi-trash')
            .click()
        })
    
        it('E seleciona a opção "Cancelar" na janela de confirmação', () => {
            cy.contains('button', 'No, Cancel').click()
        })
    
        it(`Então o sistema não deve excluir o employee "${dataEmployeeLocal.firstNameLocal}"`, () => {
            cy.get('.oxd-table-card').should('contain.text', `${dataEmployeeLocal.firstNameLocal}`)
        })
        
        after(() => {
            cy.clearLocalStorage()
            cy.clearCookies()
        })
    }) 

    context('Clicar no ícone de lixeira e confirmar a exclusão', () => {

        const dataEmployeeLocal = {
            firstNameLocal: faker.person.firstName(),
            middleNameLocal: faker.person.middleName(),
            lastNameLocal: faker.person.lastName(),
            idLocal: Math.floor(100000 + Math.random() * 900000)
        }  
        
        it('Dado que o usuário está logado no OrangeHRM e acessa o módulo "PIM"', () => {
            cy.fazerLogin(employee.userName, employee.senha)
            cy.acessarModulo('PIM')
        })
        
        it(`E cria um Employee "${dataEmployeeLocal.firstNameLocal} ${dataEmployeeLocal.middleNameLocal}"`, () => {
            cy.criarNovoEmployeeSemLogin(
                dataEmployeeLocal.firstNameLocal, 
                dataEmployeeLocal.middleNameLocal,
                dataEmployeeLocal.lastNameLocal,
                dataEmployeeLocal.idLocal
            )
        })
        
        it('E volta para a página "Employee List"', () => {
            cy.contains('Employee List').click()
        })
        
        it(`Então pesquisa o employee "${dataEmployeeLocal.firstNameLocal} ${dataEmployeeLocal.middleNameLocal}" cadastrado`, () => {
            cy.get('.oxd-input-group')
                .filter(':has(.oxd-label:contains("Employee Name"))')
                .find('input')
                .type(`${dataEmployeeLocal.firstNameLocal} ${dataEmployeeLocal.middleNameLocal}`)
                cy.get('.oxd-table-card')
                .should('be.visible')
                cy.contains('button', 'Search').click()
            })
            
        it(`Quando o usuário clica no ícone de lixeira ao lado do nome do employee "${dataEmployeeLocal.firstNameLocal} ${dataEmployeeLocal.middleNameLocal}"`, () => {
            cy.get('.oxd-table-card')
            cy.contains(`${dataEmployeeLocal.firstNameLocal}`) 
            cy.get('.oxd-table-cell-actions')
            .find('.oxd-icon.bi-trash')
            .click()
        })
        
        it('E seleciona a opção "Yes, Delete" na janela de confirmação', () => {
            cy.contains('button', 'Yes, Delete').click()
        })
        
        it(`Então o sistema deve excluir o employee "${dataEmployeeLocal.firstNameLocal} ${dataEmployeeLocal.middleNameLocal}"`, () => {
            cy.contains(`${dataEmployeeLocal.firstNameLocal} ${dataEmployeeLocal.middleNameLocal}`).should('not.exist')
            cy.contains('Successfully Deleted')
            .should('be.visible')
    
        })
        after(() => {
            cy.clearLocalStorage()
            cy.clearCookies()
        }) 
    })    
})
