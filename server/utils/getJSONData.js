const fs = require('fs');
const request = require('request');

request('https://mtgjson.com/api/v5/SIS.json', function (error, response, body) {
  if (!error && response.statusCode == 200) {

     fs.writeFile('CardData.json', body, (err) => {
        if(err) throw err;
        console.log('file succesfully saved!');
     });
  }
})