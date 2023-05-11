const express = require('express');
const mysql = require('mysql2');
const PORT = 5000;

const app = express();

// Create MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "secret",
  database: "mtg-db",
});

// API endpoint for getting cards in a specific set
app.get('/set/:setCode', (req, res) => {
  // Get the set code from the request parameters
  const setCode = req.params.setCode;

// MySQL query for getting cards in the set
const query = `
  SELECT name, artist, number
  FROM cards
  WHERE setCode = '${setCode}'
  ORDER BY number
`;

  // Execute the query
  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving cards from database');
    } else {
      // Send the results as JSON
      res.json(results);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
