const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');
const { getTableData } = require('./getAllCards.js');

let numbers = [];

/**
 * The createFolder function creates a new folder for the given setCode.
 * This folder will be used to save relevant images within.
 */

function createFolder(setCode) {

  const folderPath = `../../client/src/images/${setCode}`;

  fs.mkdir(folderPath, (err) => {
     if (err) {
       console.error(err);
     } else {
       console.log(`Folder "${set}" created successfully!`);
     }
   });
}


/**
 * The start function downloads the corresponding images for every card within the database
 */
async function start(i) {
  try {
    let cards = await getTableData("cards");
    let urlo = (`https://scryfall.com/card/${cards[i].setCode}/${cards[i].number}/`);
    let url = urlo.toLocaleLowerCase();

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    let finalLink;

    let thirdToolboxClm = $('div.toolbox-column').eq(2);
    let firstToolboxLink = thirdToolboxClm.find('.toolbox-links').eq(0);
    let firstLi = firstToolboxLink.children().eq(0);
    let firstA;
    let secondLi = firstToolboxLink.children().eq(1);

    /**
     * Following if statement should check if a card
     */
    if (cards[i].doubleSided && numbers.includes(cards[i].number)) {
      firstA = secondLi.children().eq(0);
      finalLink = firstA.attr('href');
    } else {
      firstA = firstLi.children().eq(0);
      finalLink = firstA.attr('href');
    }

    var download = function (uri, filename) {
      return new Promise(function(resolve, reject) {
        request.head(uri, function (err, res, body) {
          request(uri).pipe(fs.createWriteStream(filename)).on('close', function() {
            resolve();
          });
        });
      });
    };

    let imageName = cards[i].name.replaceAll("!", "-");
    
    console.log(`Downloading nr. ${cards[i].number}`);
    await download(finalLink, `../../client/src/images/${cards[i].setCode}/${cards[i].number}-${imageName}.png`);
    console.log('done');
    
    numbers.push(cards[i].number);

  } catch (error) {
    console.log(error);
  }
}

module.exports = { start, createFolder };
