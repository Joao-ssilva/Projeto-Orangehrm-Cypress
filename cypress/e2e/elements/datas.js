import { faker } from '@faker-js/faker' 

export const employee = {
    firstName: faker.person.firstName(),
    middleName: faker.person.middleName(),
    lastName: faker.person.lastName(),
    id: Math.floor(100000 + Math.random() * 900000),
    userName: 'Admin',
    senha: 'admin123'
}
