require('dotenv').config();

var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var cors = require('cors');

var routes = require('./routes/router.js');

var port = process.env.PORT || 8080;        // set our port

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/login', routes);


app.listen(port);
console.log('Magic happens on port ' + port);
