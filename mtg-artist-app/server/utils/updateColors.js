const fs = require('fs');
const cardData = require('./CardData.json');
const database = require('./database');

fs.readFile(cardData, (error, data) => {
    if (error) {
        console.log(error);
        return;
    }

    const objArray = JSON.parse(data);
    const setSize = objArray.data.baseSetSize;
    const cards = objArray.data.cards;
    let colors;

    for (let i = 0; i < setSize; i++) {
        colors = cards[i].colors;
    }

});



connection.end();
