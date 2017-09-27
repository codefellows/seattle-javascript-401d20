## Lab Stuart - Express Rest API (11-12)

## About
This is a REST API for tracking sandwich recipies.
 
## Setup 

First set Environment Variables
* `export PORT=3000` 
* `export MONGODB_URI=mongodb://localhost/dev`

To start the database and server run the following command `npm run dbon && npm run start`.  

To stop the database run `npm run dboff`.


## API 

#### /api/sandwiches

This lab sets up a REST API and enables CRUD operations on data stored in a Mongo database. The API exposes a single route: '/api/sandwiches', and enables GET, POST, PUT, and DELETE HTTP methods with the following path structures: '/api/sandwiches' gets an array of sandwiches, and '/api/sandwiches/:id' leverages Express param 'id' on GET, DELETE, and PUT for specific sandwiches. 

Errors are handled with a custom middleware module at '/lib/error-middleware.js'. Errors are passed to the final catch with a callback of 4 params to signify the error.

The test file sets up mock / temp data for testing and removes all on completing. Tests are fully independent of each other and passing 7/7.
