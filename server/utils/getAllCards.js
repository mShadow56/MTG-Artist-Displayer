let mysql = require("mysql2");

/**
 * This file creates a new connection to the mtg-db database.
 * It includes two functions for opening and closing the connection, respectively,
 * as well as a function for selecting all the values from the given table.
 */

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "secret",
  database: "mtg-db",
});

/**
 * Makes a query to select all values from the table that is given to the function
 */
function getTableData(tableName) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${tableName}`;

    connection.query(sql, (error, results) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Open the connection before the query starts
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

// Close the connection after the query completes
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

// Export the function so it can be used in other modules
module.exports = { getTableData, openConnection, closeConnection };
