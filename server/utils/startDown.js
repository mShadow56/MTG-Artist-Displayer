const imageDownloader = require('./downAllImages.js');
const getAllCards = require('./getAllCards.js');

let results;

/**
 * The startDown.js main function uses the getAllCards.js to get all the data from the 'cards' table.
 * This is then used to find the number of cards for which an image will need to be downloaded.
 * Finally, imageDownloader downloads the corresponding image for each card
 */
async function main() {
    await getAllCards.openConnection();

    try {
        results = await getAllCards.getTableData("cards");

        //imageDownloader.createFolder(results[0].setCode)

        for (let i = 0; i < results.length; i++) {
            await imageDownloader.start(i);
        }
        console.log("DONE!!!");
    } catch (error) {
        console.log("ERROR")
        console.error(error);
    } finally {
        await getAllCards.closeConnection();
    }
}

main();
