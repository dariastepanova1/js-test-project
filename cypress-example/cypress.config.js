const { defineConfig } = require("cypress");

const path = require("path");
const fs = require("fs");

const getConfig = (env) => {
  const configPath = path.resolve(
    process.cwd(),
    `cypress/fixtures/config/config.${env}.json`,
  );
  return JSON.parse(fs.readFileSync(configPath, "utf-8"));
};

module.exports = defineConfig({
  allowCypressEnv: true,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  video: true,
  viewportHeight: 720,
  viewportWidth: 1080,
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: false,
    json: true,
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });
      const envName = config.env.TEST_ENV || "dev";
      const configValue = getConfig(envName);
      console.log(`Loaded config for ${envName}:`, configValue);
      config.env = {
        ...config.env,
        ...configValue.env,
      };
      Object.assign(config, configValue);
      return config;
    },
    baseUrl: "https://qauto.forstudy.space",
    specPattern: "cypress/e2e/**/*.test.js",
  },
});
