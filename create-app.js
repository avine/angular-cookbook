#! /usr/bin/env node

const fs = require('fs-extra');

const DEMO_MODE = false;

const BASE_DIR = 'cookbook'; // Without "slash" at the end

// Invoke this script using `node create-app [APP_NAME]` (same as invoking directly `./create-app.js [APP_NAME]`)
let appName = process.argv[2];

// argument mandatory
appName || exit('argument appName is missing.');

appName = appName.toLowerCase();

const appsList = fs.readdirSync(BASE_DIR);

// template app mandatory
appsList.includes('_tmpl') || exit('template app "_tmpl" is missing.');

// new argument mandatory
!appsList.includes(appName) || exit(`app "${appName}" already exists.`);

try {
  DEMO_MODE || fs.copySync(`${BASE_DIR}/_tmpl`, `${BASE_DIR}/${appName}`);
  console.log(`Created folder: ${BASE_DIR}/${appName}`);
} catch (e) {
  exit(e.message);
}

try {
  // Get "_tmpl" app configuration
  const config = JSON.parse(fs.readFileSync('.angular-cli.json', 'utf8'));
  const tmplConfig = config.apps.filter(app => app.name === '_tmpl')[0];

  // Clean configuration (when `app.name` has been removed from `BASE_DIR` folder)
  config.apps = config.apps.filter(app => app.root === 'src' || appsList.includes(app.name));

  // Set appName configuration
  const appConfig = Object.assign({}, tmplConfig);
  appConfig.name = appName;
  appConfig.root = `${BASE_DIR}/${appName}`;

  // Add appName configuration
  config.apps.push(appConfig);

  // Order apps by name
  config.apps = config.apps.sort((a, b) => a.name > b.name);

  // Update configuration
  const configString = JSON.stringify(config, undefined, 2);
  DEMO_MODE ? console.log(`\n${configString}\n`) : fs.writeFileSync('.angular-cli.json', configString, 'utf8');

  console.log('Updated file: .angular-cli.json');
} catch (e) {
  exit(e.message);
}

console.log(DEMO_MODE ? '** IN DEMO_MODE (nothing done) **' : 'Operation completed!');

// Helper
function exit(msg) {
  console.error(`Error: ${msg}`);
  process.exit(1);
}
