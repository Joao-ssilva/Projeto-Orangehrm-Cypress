/// <reference types="cypress" />
import { employee } from '../e2e/elements/datas'
import { faker } from '@faker-js/faker'

describe('Filtros de "Employee"', () => {

    context('Pesquisar um employe,e pelo nome', () => {
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

        it(`E cria um Employee com o Name de "${dataEmployeeLocal.firstNameLocal} ${dataEmployeeLocal.middleNameLocal}"`, () => {
            cy.criarNovoEmployeeSemLogin(
                dataEmployeeLocal.firstNameLocal, 
                dataEmployeeLocal.middleNameLocal,
                dataEmployeeLocal.lastNameLocal,
                dataEmployeeLocal.idLocal
            )
        })

        it(`E digita o nome "${dataEmployeeLocal.firstNameLocal} ${dataEmployeeLocal.middleNameLocal}" no campo de pesquisa "Employee Name"`, () => { 
            cy.contains('Employee List').should('be.visible').click()
            cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-autocomplete-wrapper > .oxd-autocomplete-text-input > input')
                .type(`${dataEmployeeLocal.firstNameLocal} ${dataEmployeeLocal.middleNameLocal}`)
        })

        it('E clica no botão "Search"', () => {
            cy.contains('button', 'Search').click()
        })

        it(`Então o sistema deve exibir os resultados contendo o employee "${dataEmployeeLocal.firstNameLocal} ${dataEmployeeLocal.middleNameLocal}"`, () => {
            cy.get('.oxd-table-card').should('contain.text', `${dataEmployeeLocal.firstNameLocal} ${dataEmployeeLocal.middleNameLocal}`)
        })
        after(() => {
            cy.clearLocalStorage()
            cy.clearCookies()
        })
    })

    context('Pesquisar um employee pelo ID', () => {
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

        it(`E cria um Employee com o ID "${dataEmployeeLocal.idLocal}"`, () => {
            cy.criarNovoEmployeeSemLogin(
                dataEmployeeLocal.firstNameLocal, 
                dataEmployeeLocal.middleNameLocal,
                dataEmployeeLocal.lastNameLocal,
                dataEmployeeLocal.idLocal
            )
        })

        it('E clica na página "Employee List"', () => {
            cy.contains('Employee List').click()
        })

        it(`Quando digita o Employee ID "${dataEmployeeLocal.idLocal}" no campo de pesquisa "Employee Id"`, () => {
            
            cy.contains('Employee List').should('be.visible').click()
            cy.get('.oxd-input-group')
                .filter(':has(.oxd-label:contains("Employee Id"))') 
                .find('input')
                .type(dataEmployeeLocal.idLocal)
        })

        it('E clica no botão "Search"', () => {
            cy.contains('button', 'Search').click()
        })

        it(`Então o sistema deve exibir o employee correspondente ao ID "${dataEmployeeLocal.idLocal}"`, () => {
            cy.get('.oxd-table-card').should('contain.text', `${dataEmployeeLocal.idLocal}`)
        })
        after(() => {
            cy.clearLocalStorage()
            cy.clearCookies()
        })
    })

    context('Pesquisar um employee com ID inexistente', () => {

        it('Dado que o usuário está logado no OrangeHRM', () => {
            cy.fazerLogin(employee.userName, employee.senha)
            cy.acessarModulo('PIM')
        })
        
        it('E acessa a página "Employee List"', () => {
            cy.contains('Employee List').should('be.visible').click()
        })
        
        it('Quando digita o Employee ID "99999" no campo de pesquisa "Employee ID"', () => {
            cy.get('.oxd-input-group')
                .filter(':has(.oxd-label:contains("Employee Id"))')
                .find('input') 
                .clear()
                .type('99999')
        })
        
        it('E clica no botão "Search"', () => {
            cy.contains('button', 'Search').click()
        })

        it('Então o sistema deve exibir a mensagem "No Records Found"', () => {
            cy.contains('No Records Found')
                .should('be.visible')
        })
        after(() => {
            cy.clearLocalStorage()
            cy.clearCookies()
        })
    })  

    context('Pesquisar um employee com nome inexistente', () => {
    
        const nomeInexistente = 'Nome Inexistente'
    
        it('Dado que o usuário está logado no OrangeHRM e acessa o módulo "PIM"', () => {
            cy.fazerLogin(employee.userName, employee.senha)
            cy.acessarModulo('PIM')
        })
    
        it('E está na página "Employee List"', () => {
            cy.contains('Employee List').should('be.visible').click()
        })
    
        it(`Quando digita o nome "${nomeInexistente}" no campo de pesquisa "Employee Name"`, () => {
            cy.get('.oxd-input-group')
                .filter(':has(.oxd-label:contains("Employee Name"))')
                .find('input')
                .clear()
                .type(nomeInexistente)
        })
    
        it('E clica no botão "Search"', () => {
            cy.contains('button', 'Search').click()
        })
    
        it('Então o sistema deve exibir a mensagem "No Records Found"', () => {
            cy.contains('No Records Found') 
            .should('be.visible')
        })
        after(() => {
            cy.clearLocalStorage()
            cy.clearCookies()
        })
    })    
})