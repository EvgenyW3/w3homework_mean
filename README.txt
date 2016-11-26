New movie rating system made using AngularJS

New featurs:

- Full REST skeleton returning json objects only
- AngularJS on fron-end
- Validation added(with error messages on fron-end)
- Rating count logic moved from back-end to AngularJS
- Small difference in models, since I tried to use .populate to implement connections between documents
- Cutted server.js(app.js), since I used a template for MEAN-stack apps
- Unit tests for API layer using Chai and ChaiHttp

################################################################################################

In project directory run:

npm start (to run project, don't forget to run your mongod first)

Pressing "Movies" in navbar gets you to main page.

Movie's title is a link to comments page.

Author's name is a link to page where all this author comments are listed

Tested in Google Chrome browser

For test You will need to install mocha globaly on your machine to run mocha command from your node console

npm install -g mocha

And after this run mocha in project directory
