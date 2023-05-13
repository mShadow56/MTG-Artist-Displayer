const express = require('express');
const mysql = require('mysql2');
const PORT = 5000;

const app = express();

// Create MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mtg",
});

// API endpoint for getting cards in a specific set
app.get('/set/:setCode', (req, res) => {
  // Get the set code from the request parameters
  const setCode = req.params.setCode;

  // MySQL query 1 for getting cards in the set
  const query1 = `
  SELECT cards.id, cards.name, cards.artist, cards.number
  FROM cards
  WHERE cards.setCode = '${setCode}'
  ORDER BY cards.number
`;

  // MySQL query 2 for getting colors for all cards
  const query2 = `
  SELECT card_id, GROUP_CONCAT(color) AS colors
  FROM card_colors
  GROUP BY card_id
`;

  // Execute the query 1
  connection.query(query1, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving cards from database');
    } else {
      // Execute the query 2
      connection.query(query2, (err, colorResults) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error retrieving card colors from database');
        } else {
          // Combine the results from query 1 and query 2
          const combinedResults = results.map(card => {
            const colors = colorResults.find(color => color.card_id === card.id);
            return { ...card, colors: colors && colors.colors ? colors.colors.split(',') : [] };
          });
          
          // Send the combined results as JSON
          res.json(combinedResults);
        }
      });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
