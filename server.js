// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors')

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));
app.get("/data", function (request, result) {
  result.send(projectData);
});
app.post("/data", function (request, result) {
  projectData = {
    temperature: request.body.temperature,
    date: request.body.date,
    userResponse: request.body.userResponse
  }
  console.log("New projectData");
  console.log(projectData);
  result.send();
});

// Setup Server
port = 7661;
const server = app.listen(port, ()=>{console.log(`running on port: ${port}`)});