const downer = require('./downAllImages');
const burger = require('./getAllCards.js');

let results;

async function main() {
    await burger.openConnection();

    try {
        results = await burger.getTableData("cards");

        for (let i = 0; i < results.length; i++) {
            await downer.start(i);
        }
        console.log("DONE!!!");
    } catch (error) {
        console.log("ERROR")
        console.error(error);
    } finally {
        await burger.closeConnection();
    }
}

main();
