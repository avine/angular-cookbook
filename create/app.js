#! /usr/bin/env node

const fs = require('fs-extra');

const config = require('./config');
const helper = require('./helper');

// Get app name from command line argument (`node create-app [APP_NAME]`)
let appName = process.argv[2];

// App name mandatory
appName || helper.exit('argument appName is missing.');

appName = appName.toLowerCase();

// List directories
const appsList = helper.getDirsList(helper.getPath(config.APPS_DIR));

// Template app mandatory
appsList.includes('_tmpl') || helper.exit('template app "_tmpl" is missing.');

// New app name mandatory
!appsList.includes(appName) || helper.exit(`app "${appName}" already exists.`);

// New app root folder
const appRoot = `${config.APPS_DIR}/${appName}`;

// Duplicate `_tmpl` app folder
config.DEMO_MODE || fs.copySync(helper.getPath(`${config.APPS_DIR}/_tmpl`), helper.getPath(appRoot));
console.log(`Created folder: ${appRoot}`);

// Add `README.md`
const readme = `# ${appName}\n\nDescribe your recipe...`;
config.DEMO_MODE || fs.writeFileSync(helper.getPath(helper.getPath(`${appRoot}/README.md`)), readme, 'utf8');

// Get `_tmpl` app configuration
const cliConfig = JSON.parse(fs.readFileSync(helper.getPath('.angular-cli.json'), 'utf8'));
const tmplConfig = cliConfig.apps.filter(app => app.name === '_tmpl')[0];

// Clean configuration (when `app.name` has been removed from `config.APPS_DIR` folder)
cliConfig.apps = cliConfig.apps.filter(app => app.root === 'src' || appsList.includes(app.name));

// Set new app configuration
const appConfig = Object.assign({}, tmplConfig);
appConfig.name = appName;
appConfig.root = appRoot;

// Add new app configuration
cliConfig.apps.push(appConfig);

// Order apps by name
cliConfig.apps.sort((a, b) => a.name > b.name);

// Update configuration
const cliConfigString = JSON.stringify(cliConfig, undefined, 2) + '\n';
config.DEMO_MODE
  ? console.log('\n' + cliConfigString)
  : fs.writeFileSync(helper.getPath('.angular-cli.json'), cliConfigString, 'utf8');

console.log('Updated file: .angular-cli.json');
