require('dotenv').config();

var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var routes = require('./routes/router.js');

var port = process.env.PORT || 8080;        // set our port

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/login', routes);


app.listen(port);
console.log('Magic happens on port ' + port);
