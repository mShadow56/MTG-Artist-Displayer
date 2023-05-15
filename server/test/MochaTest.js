const assert = require('assert');
const deleteFile = require('./deleteFile');
const fs = require('fs');
const getJSONData = require('../utils/getJSONData');
const isEmpty = require('./IsFolderEmpty');
const mysql = require('mysql2');
 const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "mtg",
    });

//Testing the JSON that is downloaded from the internet
describe('JSON', function () {
  it('It checks if JSON exists in the filesystem', function () {
    assert.equal(true, fs.existsSync('./CardData.json'));
  });

  it('Deletes and Downloads the JSON file', function () {
    deleteFile.deleteFile('./CardData.json');
    getJSONData.getJSONData('SIS');
  });

});






//Testing that the images are downloaded

describe('Images', function () {
  it('It checks if image folder in the filesystem is not empty', function () {
    assert.equal(true, !isEmpty.isEmpty('././../../client/src/images'));
  });
});




//Testting that the database is up and running
describe('Database', function () {
  it('It checks if it is able to receive data from database', function () {
    // Create MySQL connection
   
    connection.query(`SELECT name FROM cards WHERE number=7`, (error, results) => {
      if (error) {
        console.error(error);
      } else {
        assert.equal('Feeling of Dread', results[0].name);
      }
    });
    connection.end();
  });
});