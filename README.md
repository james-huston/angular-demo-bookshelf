angular-demo-bookshelf
======================
## Intro
This is a demo bookshelf app written using [angularjs](http://angularjs.org) to mirror the functionality so graciouly [created by vernonk](https://github.com/vernonk/backbone-library) for the CharlotteJS meetup group. I even quite shamelessly stole most of his html and css in order to make it as close to his example as possible.

This is a very simplified example. It uses no build, compile, concat, uglify, grunt, karma, or anything like that. I even follow his lead and mock my data source so you don't need a database or any REST services to run it. I am working on a more robust version based on some sort of boilerplate (not sure which yet) but it will be [available here](https://github.com/james-huston/angular-demo-bookshelf-boilerplate) in the coming weeks. Ignore the code there until the main README is updated with some info like this as it's most likely in some state of broken.

## Prereqs
You must have node, npm, and bower installed on your system and available before you can run this demo. I also use serve to act as an on the fly webserver for serving pages.

## Running the demo
To get started with this demo, checkout the repo and run the installers.
	
	git clone git@github.com:james-huston/angular-demo-bookshelf.git
	cd angular-demo-bookshelf
	npm install
	bower install

Once these have completed, start up your webserver.

	serve
	
Then navigate to the main page.

	http://localhost:3000/app/
	
## Running the unit tests
Unit tests are run using the jasmine testing suite. Once you have installed things and started your server, navigation to this URL to run your unit tests.

	http://localhost:3000/tests/unit/runner.html

## E2E testing
Currently there are no e2e tests written for this app. Keep your eyes peeled, I will add some examples soon to help you get started.