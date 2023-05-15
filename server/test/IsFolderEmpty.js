
const fs = require('fs');

function isEmpty(path) {
    return fs.readdirSync(path).length === 0;
}

module.exports={isEmpty}