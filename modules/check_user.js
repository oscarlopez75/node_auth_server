var log = require('./log.js');
var User = require('../models/user.model');



var userok = function(username, password, ip, callback){
  
  var message = {};

  var query = { username: username };

  User.find(query)
  .exec()
  .then(function(doc){
    if (doc.length > 0){
      if (doc.length > 1){
        let errorMessage = "More than one user for " + username;
        callback(errorMessage, false);
        message = {
          script: 'check_user',
          errorMessage: errorMessage
        };
        log.setMessage(message);
      }else{
        var compare = require('./pass_comp');

        compare.checkit(password, doc[0].password, function(mess, result){
          if (result){
            callback(mess, result);
            message = {
              script: 'check_user',
              errorMessage: "User " + username + " login"
            };
            log.setMessage(message);
          }else{
            callback(mess, false);
            message = {
              script: 'check_user',
              errorMessage: username + " " + mess
            };
            log.setMessage(message);
          }
        });
      }


    }else{
      callback("User " + username + " not found", false);
      var message = {
        script: 'check_user',
        errorMessage: username + " does not exist"
      };
      log.setMessage(message);
    }
  })
  .catch((err) => {
    callback("Error querying database", false);
    console.log(err);
  });
};



module.exports.userok = userok;
