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

  connect.checkCon()
    .then(check_user.userok.bind(null, req.body.username, req.body.password, req.ip))
    .then(function(role){
      res.status(200).json({
          username: req.body.username,
          role: role,
          jwt: jwt.sign({
              id: 1,
              login: req.body.username,
              role: role
          },
          process.env.JWT_SECRET, { expiresIn: 3600 })
        });
    })
    .catch(function(err){
      //console.log("Error from router.js " + err);
      res.status(400).json({message: err});
    });

});





router.post('/newuser', (req, res, next) => {

  connect.checkCon()
    .then(check_user.userok.bind(null, req.body.username, req.body.password, req.ip))
    .then(function(){
      useradd.useradd(req.body.addusername, req.body.addpassword, req.body.addrole, function(message, response){
        if (response){
          res.status(200).json({
            message: message
          });
        }else{
          res.status(400).json({message: message});
        }
      });
    })
    .catch(function(err){
      //console.log("Error from router.js " + err);
      res.status(400).json({message: err});
    });

});

router.post('/checkToken', (req, res, next) => {

  if( req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization') ){
    let token = req.headers.authorization;
    if(token === 'null'){
      return res.status(401).json({message: "Bad Token"});
    }
    jwt.verify(token, process.env.JWT_SECRET, function(error, decoded){
       if(error){
         return res.status(401).json({message: "Bad Token"});
       }else{
         return res.status(200).json({message: true});
       }
     });
  }else{
    return res.status(401).json({message: "No Token"});
  }
});



module.exports = router;
