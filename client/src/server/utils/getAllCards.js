let mysql = require("mysql2");
let cards;

let con = mysql.createPool({
  connectionLimit: 10, // default = 10
  host: "localhost",
  user: "root",
  password: "",
  database: "mtg",
});

function getTableData(tableName, callback) {
    const sql = `SELECT * FROM ${tableName}`;
  
    con.query(sql, (error, results) => {
      if (error) {
        console.error(error);
        callback(error, null);
      } else {
        callback(null, results);
      }
    });
    
  }
  

  

  
  // Export the function so it can be used in other modules
  module.exports = {getTableData};
  
 