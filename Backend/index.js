const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://scryfall.com/sets/ltr?as=text';

const cardData = {};

async function getHTML() {
	const { data: html } = await axios.get(url);
	return html;

};

getHTML().then((res) => {
	const $ = cheerio.load(res);
	$('div.text-grid-inner').each((i, card) => {
		const title = $(card).find('.card-text-title').text();
		const type = $(card).find('.card-text-type-line').text();

		cardData[title] = type;

	});

	fs.writeFile('cardData.json', JSON.stringify(cardData), (err) => {
		if (err) throw err;
		console.log('file succesfully saved!');
	});


});