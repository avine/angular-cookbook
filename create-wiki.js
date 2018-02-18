#! /usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const marked = require('marked');

const DEMO_MODE = false;
const APPS_DIR = 'cookbook';

let appsList = fs.readdirSync(getPath(APPS_DIR));
appsList = appsList.filter(appName => appName !== '_tmpl').sort((a, b) => a > b);

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

const template = fs.readFileSync(getPath('create-wiki.html'), 'utf8');
const html = template.replace('{{content}}', readmeList.join('\n<hr>\n\n'));

DEMO_MODE ? console.log(html) : fs.writeFileSync(getPath('cookbook-wiki.html'), html, 'utf8');

console.log('Updated file: "cookbook-wiki.html"');

console.log(DEMO_MODE ? '** IN DEMO_MODE (nothing done) **' : 'Operation completed!');

// Helpers

function getPath(relativePath) {
  return path.resolve(__dirname, relativePath)
}
