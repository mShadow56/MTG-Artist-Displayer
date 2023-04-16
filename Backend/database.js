let mysql = require("mysql");
let BiggestTableID;

let pool = mysql.createPool({
  connectionLimit: 10, // default = 10
  host: "localhost",
  user: "root",
  password: "xWJVh9ZQJeZ8hz84",
  database: "mtg",
});

function insertNewCard(name, artist, setCode, number) {
  name = name.replace(/'/g, "");
  artist = artist.replace(/'/g, "");

  pool.getConnection(function (err, con) {
    if (err) throw err;
    console.log("Database Connection established!!!");

    con.query("SELECT * FROM cards", function (err, resultSQL) {
      if (err) throw err;
      con.query(
        `INSERT INTO cards (name,artist,setCode, number) VALUES ('${name}', '${artist}', '${setCode}', '${number}')`,
        function (err, result) {
          if (err) throw err;
          con.release();
        }
      );
    });
  });
}

module.exports = { insertNewCard };
