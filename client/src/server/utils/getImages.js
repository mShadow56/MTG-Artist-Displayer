var fs = require('fs'),
    request = require('request');
    const burger = require('./database');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

var cards=burger();
console.log(cards);
download('https://cards.scryfall.io/png/front/7/1/71465b9b-c0c6-4cc2-b596-e25e541ae03b.png?1679614618', './images/bonds.png', function(){
  console.log('done');
});