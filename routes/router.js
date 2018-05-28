//https://jwt.io/

var express = require('express');

var check_user = require('../modules/check_user');
var connect = require('../modules/dbConnect');
var useradd = require('../modules/add_user');

var jwt = require('jsonwebtoken');



var router = express.Router();

router.get('/', function(req, res){
  res.json({message:"Welcome to the user validation api"});
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
                  login: req.body.username,
              },
              process.env.JWT_SECRET, { expiresIn: 3600 })
            });
        }else{
          res.status(400).json({message: mess});
        }
      });
    }else{
      res.status(400).json({message:"Connection to the database error, contact support"});
      console.log("Database is down. Restart it and then restart the service");
    }
  });

});

router.post('/newuser', (req, res, next) => {

  connect.checkCon(function(ready){

    if (ready){
      check_user.userok(req.body.username, req.body.password, req.ip, function(mess, found){
        if (found === true){
          /*******/
          useradd.useradd(req.body.addusername, req.body.addpassword,function(message, response){
            if (response){
              res.status(200).json({
                message: message
              });
            }else{
              res.status(400).json({message: message});
            }
          });
          /*****/
        }else{
          res.status(400).json({message: mess});
        }
      });


    }else{
      res.status(400).json({message:"Connection to the database error, contact support"});
      console.log("Database is down");
    }
  });


});



module.exports = router;
