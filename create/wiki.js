#! /usr/bin/env node

const fs = require('fs-extra');
const marked = require('marked');

const config = require('./config');
const helper = require('./helper');

// List directories
let appsList = helper.getDirsList(helper.getPath(config.APPS_DIR));

// Get `README.md` of each app recipe
const readmeList = [];
appsList.forEach(appName => {
  let readme;
  try {
    readme = fs.readFileSync(helper.getPath(`${config.APPS_DIR}/${appName}/README.md`), 'utf8');
  } catch(e) {
    readme = `# ${config.APPS_DIR}/${appName}\n\nNo given description for this recipe!`;
  }
  readmeList.push(marked(readme));
});
const readmeString = readmeList.join('\n<hr>\n\n');

const template = fs.readFileSync(helper.getPath('create/_wiki.html'), 'utf8');
const html = template.replace('{{content}}', readmeString);

// Empty existing directory or create one if not exists
config.DEMO_MODE || fs.emptyDirSync(helper.getPath(config.WIKI_DIR));

// Write wiki index
config.DEMO_MODE || fs.writeFileSync(helper.getPath(`${config.WIKI_DIR}/index.html`), html, 'utf8');
console.log(`Created file: "${config.WIKI_DIR}/index.html"`);

// Copy markdown css
const cssSrc = 'node_modules/github-markdown-css/github-markdown.css';
const cssDest = `${config.WIKI_DIR}/github-markdown.css`;
config.DEMO_MODE || fs.copySync(helper.getPath(cssSrc), helper.getPath(cssDest));
console.log(`Created file: "${cssDest}"`);

!config.DEMO_MODE || console.log('\n' + html);
