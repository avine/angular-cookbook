# AngularCookbook

This cookbook allows you to create as many app as you want to test Angular recipes.

## History

I used angular CLI to create a new app with the following arguments:

```bash
ng new angular-cookbook --inline-template --inline-style --style scss
```

Then I changed the structure of the project as follows:

```bash
# create new folders `cookbook/_tmpl`
mkdir -p cookbook/_tmpl

# copy `src` content in `cookbook/_tmpl`
cp -rf src/** cookbook/_tmpl
```

In `cookbook/_tmpl` folder, I updated the following path in `tsconfig.app.json` and `tsconfig.spec.json` files:

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
    { //<- New apps entry
      "name": "_tmpl", //<- Add app name
      "root": "cookbook/_tmpl", //<- Set app root
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

The script copies `cookbook/_tmpl` content in a new folder `cookbook/[APP_NAME]`,
adds a `README.md` to encourage the recipe documentation,
and references the new app in `angular-cli.json`.

Now, launch your app and start cooking:

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

Use the `create/wiki.js` script to generate a single documentation for all your receipes.

It create an HTML page in `dist/index.html` that aggregates the `README.md` content of each recipe into a single place.

```bash
node create/wiki
```

Now, simply open `dist/index.html` in your favorite browser.
