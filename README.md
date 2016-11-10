# Delone - don't eat alone.

- Have you ever been subjected to a completely new surrounding, like join a new school, get a new job and found yourself with no one to eat out with?  This application aims to solve this frequent user problem by providing a platform where poeple could interact and arrange to eat together. 

## Tech Specs - 
* __Angular__ used for routing and data-binding on the client side. (SPA)
* __Node__ and __Express__ used for creating a REST API on the server.
* __mongoDB__ and __mongoose__ used for data persistence.
* __Passport.js__ used for local OAuth.
* __SASS__ used as a pre-processor for manageable and neat css code.

## Installation
I'll provide a walkthrough for mac users, windows should be similar just the installation commands would slightly differ (a simple google search would pull up those commands for you!) 

* First, you need to have ```sass``` installed on your PC, do it using the following command on your terminal ```sudo gem install sass``` (Install ruby gems if you don't have it), you can check the version using ```sass -v``` once done installing. 
* navigate into this folder from command line and type in ```npm install --save-dev```, this command will automatically install all the required packages and save it locally as a dev dependency. 
* Now simply run ```nodemon app.js``` or ```node app.js``` to start the server.
* The site should be up on ```localhost:3000```.

#### The following two commands would be very helpful if you want to make edits or just play around -

* Download and install the ```grunt cli``` globally by running ```sudo npm install -g grunt-cli``` (__NOTE__: make sure you have the latest version of [node](https://nodejs.org/en/download/) pre-installed). 
* In a new terminal tab, type in ```grunt watch``` to start the grunt server. Your changes will automatically be reflected in the browser. 

I plan on finishing the application by the next four or five weeks, I'm planning on some super exciting features which I'll put here as I go along. I'll also deploy the app on heroku once I'm done building it. 
