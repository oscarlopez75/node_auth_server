//https://jwt.io/

var express = require('express');

var check_user = require('../modules/check_user');
var connect = require('../modules/dbConnect');
var useradd = require('../modules/add_user');

var jwt = require('jsonwebtoken');



var router = express.Router();

router.get('/', function(req, res){
  res.send('hooray! welcome to our api!');
});


router.post('/', (req, res, next) => {

  connect.checkCon(function(ready){
    if (ready){
      check_user.userok(req.body.username, req.body.password, req.ip, function(mess, found){
        if (found === true){
          res.status(200).json({
              username: req.body.username,
              jwt: jwt.sign({
                  id: 1,
                  username: req.body.username,
              },
              process.env.JWT_SECRET, { expiresIn: 3600 })
            });
        }else{
          res.status(401).send(mess);
        }
      });
    }else{
      res.status(400).send("Connection to the Database error, contact support");
      console.log("Database is down. Restart it and then restart the service");
    }
  });

});

router.post('/newuser', (req, res, next) => {

  connect.checkCon(function(ready){
    if (ready){
      useradd.useradd(req.body.username, req.body.password, function(message, response){
        if (response){
          res.status(200).json({
            message: message
          });
        }else{
          res.status(400).send(message);
        }
      });
    }else{
      res.status(400).send("Connection error, contact support");
      console.log("Database is down");
    }
  });

});



module.exports = router;
