# Build your front-end easier

This is ultimate build boilerplate 

[![PackageManager](https://img.shields.io/badge/npm-5.6.0-green.svg)](https://www.npmjs.com/)
[![BuildSystem](https://img.shields.io/badge/webpack-4.0.0-blue.svg)](https://webpack.js.org/)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)

## Intro

In this project we use components system, all files for component directed on one folder.

## Setup

Just clone this repository

`git clone https://github.com/WebWorkDeveloper/front-end.git`

and install dependencies

`yarn`

## Commands

We can developing you projects in development or production mode

For build your project on DEV use

`yarn dev`

For build your project for production use

`yarn prod`

For start project on development server use

`yarn start`

## Subprojects

Repo support subproject structure

For add new subproject you can do:
1. Add command for subproject in `package.json`

```diff
{
  "scripts": {
     ...
+     dev:<subproject name>: yarn dev --config-name=<subproject name>,
+     prod:<subproject name>: yarn prod --config-name=<subproject name>,
+     start:<subproject name>: yarn start --config-name<subproject name>
  }
}
```
2. Add configuration with your changes in `webpack.config.js`

```diff
return [
  {
    ...
  },
+  {
+    "name":<subproject name>,
+    ...
+  }
]
```

## You new developer?

[Introduction in project for new developer](https://github.com/WebWorkDeveloper/front-end/wiki)
