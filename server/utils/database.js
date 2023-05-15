let mysql = require("mysql2");

/**
 * This file creates a new connection to the mtg-db database.
 * It includes two functions for opening and closing the connection, respectively,
 * as well as a function for inserting new cards into the 'cards' table,
 * and a function for inserting colors into the 'card_colors' table
 */

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "secret",
  database: "mtg-db",
});

/**
 * Makes a query to the 'cards' table to insert the values of the name, artist, setCode and number given to the function
 */
function insertNewCard(name, artist, setCode, number, doubleSided) {
  name = name.replace(/'/g, "_");
  artist = artist.replace(/'/g, "_");

  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM cards", function (err, resultSQL) {
      if (err) {
        reject(err);
        return;
      }

      connection.query(
        `INSERT INTO cards (name, artist, setCode, number, doubleSided) VALUES ('${name}', '${artist}', '${setCode}', '${number}', '${doubleSided}')`,
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

/**
 * Gets the id from the 'cards' table, where the name at that id corresponds to the name given to the function.
 * Then it inserts the id and the color(s) in the 'card_colors' table
 */
function updateColors(name, number, colors, doubleSided) {
  name = name.replace(/'/g, "_");
  let query = "";

  return new Promise((resolve, reject) => {
    if (doubleSided) {
      query = `SELECT id FROM cards WHERE name = '${name}'`;
    } else {
      query = `SELECT id FROM cards WHERE (name, number) = ('${name}', ${number})`;
    }
    connection.query(query, function (err, resultSQL) {
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

      console.log('Disconnected from the MySQL server.');
      resolve();
    });
  });
}

module.exports = { insertNewCard, updateColors, openConnection, closeConnection };
