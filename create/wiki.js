#! /usr/bin/env node

const fs = require('fs-extra');
const marked = require('marked');
const helper = require('./helper');

const DEMO_MODE = false;
const APPS_DIR = 'cookbook';
const WIKI_DIR = 'dist';

let appsList = helper.getDirsList(helper.getPath(APPS_DIR));

const readmeList = [];
appsList.forEach(appName => {
  let readme;
  try {
    readme = fs.readFileSync(helper.getPath(`${APPS_DIR}/${appName}/README.md`), 'utf8');
  } catch(e) {
    readme = `# ${APPS_DIR}/${appName}\n\nNo given description for this recipe!`;
  }
  readmeList.push(marked(readme));
});

const template = fs.readFileSync(helper.getPath('create/_wiki.html'), 'utf8');
const html = template.replace('{{content}}', readmeList.join('\n<hr>\n\n'));

if (!DEMO_MODE) {
  // Empty existing directory or create one if not exists
  fs.emptyDirSync(helper.getPath(WIKI_DIR));

  // Write wiki index
  fs.writeFileSync(helper.getPath(`${WIKI_DIR}/index.html`), html, 'utf8');

  // Copy markdown css
  const cssSrc = helper.getPath('node_modules/github-markdown-css/github-markdown.css');
  const cssDest = helper.getPath(`${WIKI_DIR}/github-markdown.css`);
  fs.copySync(cssSrc, cssDest);
} else {
  console.log(html);
}

console.log(`Created file: "${WIKI_DIR}/index.html"`);
console.log(`Created file: "${WIKI_DIR}/github-markdown.css"`);

console.log(DEMO_MODE ? '** IN DEMO_MODE (nothing done) **' : 'Operation completed!');
