angular-demo-bookshelf
======================
# Prereqs
You must have node, npm, and bower installed on your system and available before you can run this demo. I also use serve to act as an on the fly webserver for serving pages.

# Running the demo
To get started with this demo, checkout the repo and run the installers.
	
	git clone git@github.com:james-huston/angular-demo-bookshelf.git
	cd angular-demo-bookshelf
	npm install
	bower install

Once these have completed, start up your webserver.

	serve
	
Then navigate to the main page.

	http://localhost:3000/app/
	
# Running the unit tests
Unit tests are run using the jasmine testing suite. Once you have installed things and started your server, navigation to this URL to run your unit tests.

	http://localhost:3000/tests/unit/runner.html

