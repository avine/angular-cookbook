
# AngularCookbook

I used angular CLI to create a new app with the following arguments:

```bash
ng new angular-cookbook --inline-template --inline-style --style scss
```

## Angular CLI

https://github.com/angular/angular-cli/wiki

Angular CLI `package.json` dependencies includes:

- `webpack`: Static module bundler for modern JavaScript applications. When webpack processes your application, it recursively builds a dependency graph that includes every module your application needs, then packages all of those modules into one or more bundles.
- `typescript`: Compiles .ts files script to .js.
- `html-webpack-plugin`: Webpack **plugin** that simplifies creation of HTML files to serve your webpack bundles.
- `node-sass`: Compile .scss files to css.
- `sass-loader`: Webpack **loader** to load .scss file and compile it to css.
- ...

More on Angular CLI dependancies:
https://github.com/angular/angular-cli/blob/master/package.json

More on Webpack:
- https://webpack.js.org/
- https://webpack.js.org/loaders/
- https://webpack.js.org/plugins/

## Angular external dependencies

- core-js
- zone.js

## Angular boilerplate structure

- src/main.ts (which imports src/app/app.module.ts and src/app/app.component.ts)
- src/index.html
- src/styles.scss

These assets are bundled by Webpack.

## .angular-cli.json

Contains the list of `apps` definition.
You can have one or more apps in your project.

## Angular testing

The basics.
