

var validate = function(username, password, callback){

  if (username && password){
    if (username.length > 3){
      var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}/;
      if (re.test(password)){
        callback("User and password ok", true);
      }else{
        callback("Bad password", false);
      }
    }else{
      callback("User less than 4", false);
    }
  }else{
    callback("User or password missing", false);
  }
};




module.exports.validate = validate;
