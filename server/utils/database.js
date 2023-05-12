let mysql = require("mysql2");

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "secret",
  database: "mtg-db",
});

function insertNewCard(name, artist, setCode, number) {
  name = name.replace(/'/g, "_");
  artist = artist.replace(/'/g, "_");

  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM cards", function (err, resultSQL) {
      if (err) {
        reject(err);
        return;
      }

      connection.query(
        `INSERT INTO cards (name, artist, setCode, number) VALUES ('${name}', '${artist}', '${setCode}', '${number}')`,
        function (err, result) {
          if (err) {
            reject(err);
            return;
          }

          resolve(result);
        }
      );
    });
  });
}

function updateColors(name, colors) {
  name = name.replace(/'/g, "_");

  return new Promise((resolve, reject) => {
    connection.query(`SELECT id FROM cards WHERE name = '${name}'`, function (err, resultSQL) {
      if (err) {
        reject(err);
        return;
      }

      const cardId = resultSQL[0].id; // Extract the id from the SELECT result

      if (colors.length === 0) {
        // Insert a row for colorless cards

        connection.query(`INSERT INTO card_colors (card_id, color) VALUES ('${cardId}', NULL)`,
          function (err, result) {
            if (err) {
              reject(err);
              return;
            }

            resolve(result);
          }
        );
      } else {
        // Insert a row for each color value
        const promises = colors.map(color => {
          return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO card_colors (card_id, color) VALUES ('${cardId}', '${color}')`,
              function (err, result) {
                if (err) {
                  reject(err);
                  return;
                }

                resolve(result);
              }
            );
          });
        });

        Promise.all(promises).then(results => {
          resolve(results);
        }).catch(error => {
          reject(error);
        });
      }
    });
  });
}

// Open the connection before all database operations are initiated
function openConnection() {
  return new Promise((resolve, reject) => {
    connection.connect(function (err) {
      if (err) {
        reject(err);
        return;
      }

      console.log('Connected to the MySQL server.');
      resolve();
    });
  });
}

// Close the connection once all database operations are complete
function closeConnection() {
  return new Promise((resolve, reject) => {
    connection.end(function (err) {
      if (err) {
        reject(err);
        return;
      }

      console.log('Connection to the MySQL server closed.');
      resolve();
    });
  });
}

module.exports = { insertNewCard, updateColors, openConnection, closeConnection };
