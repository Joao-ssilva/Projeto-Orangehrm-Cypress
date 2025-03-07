
// const { defineConfig } = require("cypress")

// module.exports = defineConfig({
//   reporter: 'cypress-mochawesome-reporter',
//   video: false,
//   screenshotsFolder: 'cypress/reports/images',
//   reporterOptions: {
//     charts: true,
//     reportPageTitle: 'Portfólio Cypress Joao Silva',
//     embeddedScreenshots: true, 
//     inlineAssets: true,
//     saveAllAttempts: true
//   },
//   e2e: {
//     baseUrl: 'https://opensource-demo.orangehrmlive.com',
//     testIsolation: false,
//     viewportWidth: 1920,
//     viewportHeight: 1080,
//     setupNodeEvents(on, config) {
//       require('cypress-mochawesome-reporter/plugin')(on);
//       return config;
//     },
//   },
// })
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  video: false,
  screenshotsFolder: "cypress/reports/images", 
  reporterOptions: {
    reportDir: "cypress/reports/html",
    charts: true,
    reportPageTitle: "Portfólio Cypress Joao Silva",
    embeddedScreenshots: true, // 🔥 Ativar para incorporar prints das falhas no relatório
    inlineAssets: true, // Permitir que os assets (imagens) sejam carregados diretamente no relatório
    saveAllAttempts: false
  },
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com",
    testIsolation: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
  },
});
