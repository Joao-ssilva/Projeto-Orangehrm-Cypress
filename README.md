# Projeto Site Orangehrm Cypress com Gherkin

## 💻 Tecnologias

Cypress
Gherkin
Javascript
Mochawesome

Este projeto utiliza Cypress para realizar testes automatizados em uma aplicação web.

## Tecnologias Utilizadas
- **Cypress**: Framework de testes end-to-end.
- **Node.js**: Ambiente de execução para JavaScript.
- **Yarn**: Gerenciador de pacotes.

## Pré-requisitos
Antes de rodar os testes, certifique-se de ter as seguintes ferramentas instaladas:
- **Node.js** (com npm ou yarn)
- **Yarn** (caso não tenha, instale via `npm install -g yarn`)

## Instalação
1. **Clone o repositório do projeto**:
   `git clone <Link do projeto> `

3. Navegue até o diretório do projeto:
  `cd <NOME_DO_PROJETO> `

4. Instale as dependências do projeto:
Se estiver utilizando o Yarn:
  ` yarn install `
Ou, caso use npm:
  ` npm install `

## Rodando os Testes
Para rodar os testes com o Cypress: Caso utilize o Yarn, rode:
 `yarn cypress open `

Caso utilize o npm, rode:
 `npx cypress open `

## Isso abrirá a interface do Cypress, onde você pode visualizar e rodar os testes disponíveis.
Para rodar todos os testes em modo headless, rode: `yarn cypress run` ou `npx cypress run`
## 📊 Relatório de Testes - Mochawesome
Este projeto gera um relatório automatizado com o Mochawesome, que exibe os resultados dos testes de forma detalhada.

## 📄 [Documentação do Mochawesome](https://link-da-documentacao.com)

## 🔗 Acesse o relatório atualizado: O link para o relatório mais recente pode ser encontrado na seção About do repositório.

## Resumo do Projeto

Este projeto foi desenvolvido com o objetivo de explorar ao máximo as capacidades do Cypress para testes automatizados. Nele, todos os cenários de teste foram descritos utilizando a linguagem Gherkin, o que facilitou a estruturação e a leitura dos testes. Os testes cobrem todas as frentes da aplicação, incluindo funcionalidades de front-end, testes funcionais, garantindo uma cobertura abrangente de todas as interações possíveis.

Além disso, a integração com o GitHub Actions foi realizada para automatizar a execução da bateria de testes na pipeline, permitindo que a validação dos testes ocorra de forma contínua. O projeto gera relatórios automáticos utilizando o Mochawesome, que facilita o acompanhamento dos resultados de cada execução.

Este projeto foi uma grande experiência de aprendizado, permitindo uma imersão profunda nas técnicas de teste que o Cypress oferece, especialmente no uso de Gherkin para descrever cenários e na automação de processos no pipeline de CI/CD.