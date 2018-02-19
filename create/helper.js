const path = require('path');
const fs = require('fs-extra');

// Exit with std error message
function exit(msg) {
  console.error(`Error: ${msg}`);
  process.exit(1);
}

// Resolve path relative to project root
function getPath(relativePath) {
  return path.resolve(__dirname, '../', relativePath);
}

// Return ordered list of directories
function getDirsList(fullpath) {
  let list = fs.readdirSync(fullpath);
  list = list.filter(item => fs.statSync(`${fullpath}/${item}`).isDirectory());
  list.sort((a, b) => a > b);
  return list;
}

exports = module.exports = {
  exit,
  getPath,
  getDirsList
};
