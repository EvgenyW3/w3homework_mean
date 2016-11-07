New movie rating system made using AngularJS

New featurs:

- Full REST skeleton returning json objects only
- AngularJS on fron-end
- Validation added(with error messages on fron-end)
- Rating count logic moved from back-end to AngularJS
- Small difference in models, since I tried to use .populate to implement connections between documents
- Cutted server.js(app.js), since I used a template for MEAN-stack apps

Problems that need fixes:
- I didn't use directives(one external directive is used for file upload ng-file-upload) nor servies, all calls to API are in controllers. I know it's a bad practise, but I tried to keep thing simple for myself since it's only my 3rd day working with AngularJS

################################################################################################

In project directory run:

npm start (to run project, don't forget to run your mongod first)

Pressing "Movies" in navbar gets you to main page.

Movie's title is a link to comments page.

Author's name is a link to page where all this author comments are listed

Tested in Google Chrome browser
