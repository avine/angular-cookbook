const DEMO_MODE = false;
const APPS_DIR = 'cookbook';
const WIKI_DIR = 'dist';
const RELATIVE_PATH_TO_ROOT = '../';

exports = module.exports = {
  DEMO_MODE,
  APPS_DIR,
  WIKI_DIR,
  RELATIVE_PATH_TO_ROOT
};

!DEMO_MODE || console.log(`
###############
## DEMO_MODE ##
###############
`);
