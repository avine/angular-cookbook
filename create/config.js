const DEMO_MODE             = false;
const APPS_DIR              = 'cookbook';
const TMPL_APP_NAME         = '_tmpl';
const WIKI_DIR              = 'dist';
const RELATIVE_PATH_TO_ROOT = '../';

exports = module.exports = {
  DEMO_MODE,
  APPS_DIR,
  TMPL_APP_NAME,
  WIKI_DIR,
  RELATIVE_PATH_TO_ROOT
};

!DEMO_MODE || console.log(`
###############
## DEMO_MODE ##
###############
`);
