const express = require('express');
const app = express();
const PORT = 3000;

app.get('/api/data', (req, res) => {
  const data = [
    { id: 1, title: 'First item', description: 'This is the first item' },
    { id: 2, title: 'Second item', description: 'This is the second item' },
    { id: 3, title: 'Third item', description: 'This is the third item' },
  ];
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
