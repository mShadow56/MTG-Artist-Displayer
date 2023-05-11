const fs = require('fs');
const cardData = require('./CardData.json');
const database = require('./database');

fs.readFile('./CardData.json', (error, data) => {
  if (error) {
    console.log(error);
    return;
  }

  const objArray = JSON.parse(data);
  const setSize = objArray.data.baseSetSize;
  const cards = objArray.data.cards;
  let name;
  let artist;
  let setCode;
  let number;
  //let colors;

  for (let i = 0; i < setSize; i++) {
    name = cards[i].name;
    artist = cards[i].artist;
    setCode = cards[i].setCode;
    number = cards[i].number;
	//colors = cards[i].colors;

    if (name.includes('//')) {
      const [frontName, backName] = name.split('//');
      database.insertNewCard(frontName.trim(), artist, setCode, number);
      database.insertNewCard(backName.trim(), artist, setCode, number);
      i++; // skip next card since it's the back side of this one
    } else {
      database.insertNewCard(name, artist, setCode, number);
    }
	//database.updateColors(name, colors);
  }
});
