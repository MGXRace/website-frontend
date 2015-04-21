# Frontend for MGXRace website

This is a node project for managing the frontend of the MGXRace website. This
is intended to compile the css, js, minify images, and arrange them so the
django backend can find the files.

### Getting Started

```shell
$ npm install -g gulp
$ npm install
```

It's recommended to use npm ~0.10 and [nvm](https://github.com/creationix/nvm)

### How to Build

```shell
$ gulp build
```

### How to Run

```shell
$ gulp
```

This will start a lightweight development server with LiveReload and
synchronized browsing across multiple devices and browsers.

### How to Test

TODO

Run unit tests powered by [Jest](https://facebook.github.io/jest/) with the
following [npm](https://www.npmjs.org/doc/misc/npm-scripts.html) command:

```shell
$ npm test
```

Test any javascript module by creating a `__tests__/` directory where
the file is. Name the test by appending `-test.js` to the js file.
[Jest](https://facebook.github.io/jest/) will do the rest.
