let mysql = require("mysql2");

let pool = mysql.createPool({
  connectionLimit: 10, // default = 10
  host: "localhost",
  user: "root",
  password: "secret",
  database: "mtg-db",
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
        `INSERT INTO cards (name, artist, setCode, number) VALUES ('${name}', '${artist}', '${setCode}', '${number}')`,
        function (err, result) {
          if (err) throw err;
          con.release();
        }
      );
    });
  });
}
/*
function updateColors(name, colors) {

  pool.getConnection(function (err, con) {
    if (err) throw err;

    con.query(`SELECT id FROM cards WHERE name = '${name}'`, function (err, resultSQL) {
      if (err) throw err;

      const cardId = resultSQL[0].id; // Extract the id from the SELECT result

      if (colors.length === 0) {
        // Insert a row for colorless cards

        con.query(`INSERT INTO card_colors (card_id, color) VALUES ('${cardId}', NULL)`,
          function (err, result) {
            if (err) throw err;
            con.release();
          }
        );
      } else {
        // Insert a row for each color value
        for (const color of colors) {
          con.query(`INSERT INTO card_colors (card_id, color) VALUES ('${cardId}', '${color}')`,
            function (err, result) {
              if (err) throw err;
              con.release();
            }
          );
        }
      }
    });
  });
}
*/

module.exports = { insertNewCard/*, updateColors*/ };
