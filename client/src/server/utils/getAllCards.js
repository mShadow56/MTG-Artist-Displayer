let mysql = require("mysql2");

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mtg",
});

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
