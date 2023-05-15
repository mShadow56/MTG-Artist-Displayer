const fs = require('fs');
const database = require('./database.js');


/**
 * This file reads the CardData.json file and extracts the needed values,
 * which is then sent through the database.js file and stored in the database.
 */
fs.readFile('./CardData.json', async (error, data) => {
  if (error) {
    console.log(error);
    return;
  }

  const objArray = JSON.parse(data);
  const setData = objArray.data;
  const setCode = setData.code;
  const setName = setData.name;
  const setSize = setData.baseSetSize;
  const cards = setData.cards;
  let name;
  let artist;
  let number;
  let colors;

  // Open the connection before the loop
  await database.openConnection();

  //Loops through every card within the CardData.json file and extracts relevant data
  for (let i = 0; i < setSize; i++) {
    if (cards[i]) {
      name = cards[i].name;
      artist = cards[i].artist;
      number = cards[i].number;
  
      /**
       * Some cards have both a front side and a back side, each side having a different name.
       * Those cards are given as a single card within the CardData.json file, but we want to seperate them.
       * These cards' names are given as 'Front Name // Back Name', f.x., 'Bloodline Keeper // Lord of Lineage'.
       * We then split the name by the '//' and trim them afterwards, before sending them to the database.
       */
      if (name.includes('//')) {
        const [frontName, backName] = name.split('//');
        await database.insertNewCard(frontName.trim().replaceAll("!", "-"), artist, setCode, number, 1); // 1 = true -- used for setting the value of doubleSided (TINYINT)
        await database.insertNewCard(backName.trim().replaceAll("!", "-"), artist, setCode, number, 1); // 1 = true -- used for setting the value of doubleSided (TINYINT)
        i++; // skip next card since it's the back side of this one
      } else {
        await database.insertNewCard(name.replaceAll("!", "-"), artist, setCode, number, 0); // 0 = false -- used for setting the value of doubleSided (TINYINT)
      }
    } else i++;
  }

  /**
   * This next for loop updates the card_colors table with the colors of each card
   */
  for (let j = 0; j < setSize; j++) {
    if (cards[j]) {
      name = cards[j].name;
      number = cards[j].number;
      colors = cards[j].colors;
  
      if (name.includes('//')) {
        const [frontName, backName] = name.split('//');
        await database.updateColors(frontName.trim().replaceAll("!", "-"), number, colors, true);
        await database.updateColors(backName.trim().replaceAll("!", "-"), number, colors, true);
        j++; // skip next card since it's the back side of this one
      } else {
        await database.updateColors(name.replaceAll("!", "-"), number, colors, false);
      }
    } else j++;
  }

  // Close the connection after the loop
  await database.closeConnection();
});
