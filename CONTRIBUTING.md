## Run the app locally

##### Install [Node & NPM](http://nodejs.org) globally

##### Install [Bower](http://bower.io) globally
* `sudo npm install -g bower`

##### Install local `Node modules` and `Bower components`
* Under the project root, run `npm install`
 * You don't have to run `bower install` because it will be run automatically after `npm install` is finished

##### Run the app in the browser
* Under the project root, run `gulp`
 * `BowserSync` will open a browser page to display the app's homepage
 * Any changes to the HTML and JS files will be processed and reflected in the browser without it being reloaded

## Run unit tests

##### Keep running tests
* Under the project root, run `npm test`
 * `Karma` will captures browsers and run all tests
 * `Karma` will keep watching file changes and run tests whenever this happens

##### Run tests once
* Under the project root, run `npm run test-single`
 * `Karma` will captures browsers, run all tests and exit

## Docs

##### There will be a link for `docs` on the homepage
* Path: /docs/src/st.js.html
