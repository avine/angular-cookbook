#! /usr/bin/env node

const fs = require('fs-extra');
const marked = require('marked');

const config = require('./config');
const helper = require('./helper');

// Available directories in `config.APPS_DIR`
let appsList = helper.getDirsList(helper.getPath(config.APPS_DIR));

const linkList = [];
const readmeList = [];
appsList.forEach(appName => {
  if (appName === config.TMPL_APP_NAME) {
    return;
  }

  const appRoot = `${config.APPS_DIR}/${appName}`;

  try {
    // Get `README.md` content of each app recipe
    let readme = fs.readFileSync(helper.getPath(`${appRoot}/README.md`), 'utf8');

    const header = getHeader(readme);
    if (header) {
      // Generate markdown link to the first header of the recipe
      const text = header !== appName ? `${header} ( ${appName} )` : header;
      linkList.push(`- [${text}](#${headerToAnchor(header)})`);
    } else {
      // Add header in the recipe when not available
      linkList.push(`- [${appName}](#${headerToAnchor(appName)})`);
      readme = `# ${appName}\n\n${readme}`;
    }
    readmeList.push(readme);

    console.log(`Added wiki: ${appRoot}`);
  } catch(e) {
    console.log(`Not available wiki: ${appRoot}`);
  }
});

// Use markdown to generate wiki content
const content = marked(linkList.join('\n') + '\n\n' + readmeList.join('\n___\n'));

// Inject content in wiki template
const template = fs.readFileSync(helper.getPath('create/_wiki.html'), 'utf8');
const html = template.replace('{{content}}', content);

// Empty existing directory or create one if not exists
config.DEMO_MODE || fs.emptyDirSync(helper.getPath(config.WIKI_DIR));

// Write wiki index
config.DEMO_MODE || fs.writeFileSync(helper.getPath(`${config.WIKI_DIR}/index.html`), html, 'utf8');
console.log(`Created file: ${config.WIKI_DIR}/index.html`);

// Copy markdown css
const cssSrc = 'node_modules/github-markdown-css/github-markdown.css';
const cssDest = `${config.WIKI_DIR}/github-markdown.css`;
config.DEMO_MODE || fs.copySync(helper.getPath(cssSrc), helper.getPath(cssDest));
console.log(`Created file: ${cssDest}`);

!config.DEMO_MODE || console.log('\n' + html);

// Find first header in markdown
function getHeader(readme) {
  const match = readme.match(/#\s+([^\n\r]+)/);
  return match ? match[1].trim() : null;
}

// Get header id attribute
function headerToAnchor(header) {
  return header.toLowerCase()
    .replace(/[^a-z0-9_]/g, '-')
    .replace(/-+/g, '-');
}
