const fs = require('fs');
const request = require('request');

/**
 * This file downloads a JSON file from a website using the set parameter to find the intended file
 */
function getJSONData(set) {

   const fileName = 'CardData.json';

   request(`https://mtgjson.com/api/v5/${set}.json`, function (error, response, body) {
     if (!error && response.statusCode == 200) {

        fs.writeFile(fileName, body, (err) => {
           if(err) throw err;
           console.log(`File "${fileName}" succesfully saved!`);
        });
     }
   })

}

module.exports = { getJSONData };