const fs = require('fs');
const burger = require('./database');

fs.readFile('./CardData.json', (error, data) => {
     if(error){
        console.log(error);
        return;
     }
     const objArray = JSON.parse(data);
		 var setSize = objArray.data.baseSetSize;
		 var cards = objArray.data.cards;
		 var name;
		 var artist;
		 var number;
		 
		 for(let i = 0; i < setSize; i++) {
			setCode = cards[i].setCode;
			name = cards[i].name;
			artist = cards[i].artist;
			number = cards[i].number;

			//console.log(name + " art by " + artist);
			burger.insertNewCard(name, artist, setCode, number);
		 }
     //console.log(objArray);

})