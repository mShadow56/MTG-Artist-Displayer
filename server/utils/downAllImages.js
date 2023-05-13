const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');
const burger = require('./getAllCards.js');

function start(i) {

  burger.getTableData("cards", (error, results) => {
    if (error) {
      console.error(error);
    } else {
      //console.log(results);
      //i loop st aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaarts      

      let urlo = ('https://scryfall.com/card/' + `${(results[i].setCode)}` + '/' + `${results[i].number}` + '/');
      let url = urlo.toLocaleLowerCase();

      console.log("s                                                      " + url);

      axios.get(url)
        .then(response => {
          const $ = cheerio.load(response.data);
          const sixthLink = $('ul.toolbox-links a.button-n[rel="nofollow"]').eq(5).attr('href');

          var download = function (uri, filename, callback) {
            request.head(uri, function (err, res, body) {

              request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
            });
          };

          download(sixthLink, `../../client/src/images/` + `${results[i].name}` + `.png`, function () {
            console.log('done');
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  });
};

module.exports = { start };