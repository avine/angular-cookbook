# AngularCookbook

This cookbook allows you to create as many app as you want to test Angular recipes.

## History

I used angular cli to create a new app with the following arguments:

```bash
ng new angular-cookbook --inline-template --inline-style --style scss
```

Then I changed the structure of the project as follows:

```bash
# create new folders `cookbook/_tmpl`
mkdir -p cookbook/_tmpl

# copy `src` content in `cookbook/_tmpl`
cp -rf src/** cookbook/_tmpl

# add README to encourage recipe documentation
touch cookbook/_tmpl/README.md
echo $'# AngularCookbook\n\nDescribe your recipe...' > cookbook/_tmpl/README.md
```

In `cookbook/_tmpl` folder, i updated the following path in `tsconfig.app.json` and `tsconfig.spec.json` files:

```txt
{
  "extends": "../../tsconfig.json", //<- Update path 
  ...
```

Finally I added a new `"apps"` entry in `angular-cli.json` file:

```txt
{
  ...
  "apps": [
    {
      "root": "src",
      "outDir": "dist",
      ...
    },
    { //<- Add entry
      "name": "_tmpl",
      "root": "cookbook/_tmpl",
      "outDir": "dist",
      ...
    }
  ],
  ...
}
```

## Usage

### create/app.js

Use the `create/app.js` script to create a new recipe `[APP_NAME]` for this cookbook:

```bash
node create/app [APP_NAME]

# ...or run as node script
./create/app.js [APP_NAME]`
```

(for the second method to work you'll probably need to change permission: `chmod +x ./create/app.js`).

This copies `cookbook/_tmpl` content in a new folder `cookbook/[APP_NAME]`, and adds your new app in `angular-cli.json`.

Launch your app and start cooking:

```bash
# serve app
ng serve --app [APP_NAME]

# generate component in `cookbook/[APP_NAME]/app/hello`
ng g c --app [APP_NAME] hello

# and don't forget to test your recipe (you know, TDD...)
ng test --app [APP_NAME]

# build app
ng build --app [APP_NAME] --prod
```

### create/wiki.js

Use the `create/wiki.js` script to generate an HTML page `dist/index.html`.

This page aggregates the `README.md` content of each recipe into a single place.

```bash
node create/wiki
```

Next, simply open `dist/wiki.html` in your favorite browser.
