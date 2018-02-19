#! /usr/bin/env node

const fs = require('fs-extra');
const helper = require('./helper');

const DEMO_MODE = false;
const APPS_DIR = 'cookbook';

// Get app name from command line argument (`node create-app [APP_NAME]`)
let appName = process.argv[2];

// App name mandatory
appName || helper.exit('argument appName is missing.');

appName = appName.toLowerCase();

const appsList = helper.getDirsList(helper.getPath(APPS_DIR));

// Template app mandatory
appsList.includes('_tmpl') || helper.exit('template app "_tmpl" is missing.');

// New app name mandatory
!appsList.includes(appName) || helper.exit(`app "${appName}" already exists.`);

const appRoot = `${APPS_DIR}/${appName}`;

try {
  DEMO_MODE || fs.copySync(helper.getPath(`${APPS_DIR}/_tmpl`), helper.getPath(appRoot));
  console.log(`Created folder: ${appRoot}`);
} catch (e) {
  helper.exit(e.message);
}

try {
  // Get "_tmpl" app configuration
  const config = JSON.parse(fs.readFileSync(helper.getPath('.angular-cli.json'), 'utf8'));
  const tmplConfig = config.apps.filter(app => app.name === '_tmpl')[0];

  // Clean configuration (when `app.name` has been removed from `APPS_DIR` folder)
  config.apps = config.apps.filter(app => app.root === 'src' || appsList.includes(app.name));

  // Set new app configuration
  const appConfig = Object.assign({}, tmplConfig);
  appConfig.name = appName;
  appConfig.root = appRoot;

  // Add new app configuration
  config.apps.push(appConfig);

  // Order apps by name
  config.apps.sort((a, b) => a.name > b.name);

  // Update configuration
  const configString = JSON.stringify(config, undefined, 2) + '\n';
  DEMO_MODE
    ? console.log('\n' + configString)
    : fs.writeFileSync(helper.getPath('.angular-cli.json'), configString, 'utf8');

  console.log('Updated file: .angular-cli.json');
} catch (e) {
  helper.exit(e.message);
}

console.log(DEMO_MODE ? '** IN DEMO_MODE (nothing done) **' : 'Operation completed!');
