#! /usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const marked = require('marked');

const DEMO_MODE = false;
const APPS_DIR = 'cookbook';

const appsList = fs.readdirSync(getPath(APPS_DIR));

const readmeList = [];
appsList.forEach(appName => {
  let readme;
  try {
    readme = fs.readFileSync(getPath(`${APPS_DIR}/${appName}/README.md`), 'utf8');
  } catch(e) {
    readme = `# ${APPS_DIR}/${appName}\n\nNo given description for this recipe!`;
  }
  readmeList.push(marked(readme));
});

const tpl = fs.readFileSync(getPath('create-wiki.tpl.html'), 'utf8');

const html = tpl.replace('{{content}}', readmeList.join('\n<hr>\n\n'));

DEMO_MODE ? console.log(html) : fs.writeFileSync(getPath('create-wiki.html'), html, 'utf8');

console.log('Updated file: "create-wiki.html"');

console.log(DEMO_MODE ? '** IN DEMO_MODE (nothing done) **' : 'Operation completed!');

// Helpers

function exit(msg) {
  console.error(`Error: ${msg}`);
  process.exit(1);
}

function getPath(relativePath) {
  return path.resolve(__dirname, relativePath)
}
