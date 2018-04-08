let mongoose = require('mongoose');
var log = require('./log');

const server = '127.0.0.1:27017'; // DB SERVER
const database = 'client'; // YOUR DB NAME

class Database {
  constructor() {
    this._connect()
  }



  _connect() {
     mongoose.connect("mongodb://" + server + "/" + database)
       .then(() => {
         console.log('Connection to ' + server + "/" + database +  ' successful')
       })
       .catch(err => {
         console.error('Database connection error');         
       })
  }

}

var checkCon = function(callback) {
  callback(mongoose.connection.readyState);
};

module.exports = new Database()
module.exports.checkCon = checkCon;
