#! /usr/bin/env node

const fs = require('fs-extra');

const config = require('./config');
const helper = require('./helper');

// Get app name from command line argument (`node create-app [APP_NAME]`)
let appName = process.argv[2];

// App name mandatory
appName || helper.exit('argument appName is missing.');

appName = appName.toLowerCase();

// Available directories in `config.APPS_DIR`
const appsList = helper.getDirsList(helper.getPath(config.APPS_DIR));

// Template app mandatory
appsList.includes(config.TMPL_APP_NAME) || helper.exit(`template app "${config.TMPL_APP_NAME}" is missing.`);

// New app name mandatory
!appsList.includes(appName) || helper.exit(`app "${appName}" already exists.`);

// New app root folder
const appRoot = `${config.APPS_DIR}/${appName}`;

// Duplicate `config.TMPL_APP_NAME` app folder
config.DEMO_MODE || fs.copySync(helper.getPath(`${config.APPS_DIR}/${config.TMPL_APP_NAME}`), helper.getPath(appRoot));
console.log(`Created folder: ${appRoot}`);

// Add `README.md`
const readme = `# ${appName}\n\nDescribe your recipe...`;
config.DEMO_MODE || fs.writeFileSync(helper.getPath(`${appRoot}/README.md`), readme, 'utf8');

// Get Angular CLI config file and its `config.TMPL_APP_NAME` app configuration
const cliConfig = JSON.parse(fs.readFileSync(helper.getPath('.angular-cli.json'), 'utf8'));
const tmplConfig = cliConfig.apps.filter(app => app.name === config.TMPL_APP_NAME)[0];

// Clean configuration (when `app.name` has been removed from appsList)
cliConfig.apps = cliConfig.apps.filter(app => app.root === 'src' || appsList.includes(app.name));

// Duplicate `config.TMPL_APP_NAME` app configuration and set new app configuration
const appConfig = Object.assign({}, tmplConfig);
appConfig.name = appName;
appConfig.root = appRoot;

// Add new app configuration to Angular CLI config
cliConfig.apps.push(appConfig);

// Order apps by name
cliConfig.apps.sort((a, b) => a.name > b.name);

// Update Angular CLI configuration
const cliConfigString = JSON.stringify(cliConfig, undefined, 2) + '\n';
config.DEMO_MODE
  ? console.log('\n' + cliConfigString)
  : fs.writeFileSync(helper.getPath('.angular-cli.json'), cliConfigString, 'utf8');

console.log('Updated file: .angular-cli.json');
