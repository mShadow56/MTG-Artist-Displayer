const fs = require('fs');
const cardData = require('./CardData.json');
const database = require('./database');

fs.readFile('./CardData.json', async (error, data) => {
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
  let colors;

  // Open the connection before the loop
  await database.openConnection();

  for (let i = 0; i < setSize; i++) {
    if (cards[i]) {
      name = cards[i].name;
      artist = cards[i].artist;
      setCode = cards[i].setCode;
      number = cards[i].number;
  
      if (name.includes('//')) {
        const [frontName, backName] = name.split('//');
        await database.insertNewCard(frontName.trim(), artist, setCode, number);
        await database.insertNewCard(backName.trim(), artist, setCode, number);
        i++; // skip next card since it's the back side of this one
      } else {
        await database.insertNewCard(name, artist, setCode, number);
      }
    } else i++;
  }

  for (let j = 0; j < setSize; j++) {
    if (cards[j]) {
      name = cards[j].name;
      colors = cards[j].colors;
  
      if (name.includes('//')) {
        const [frontName, backName] = name.split('//');
        await database.updateColors(frontName.trim(), colors);
        await database.updateColors(backName.trim(), colors);
        j++; // skip next card since it's the back side of this one
      } else {
        await database.updateColors(name, colors);
      }
    } else j++;
  }

  // Close the connection after the loop
  await database.closeConnection();
});
