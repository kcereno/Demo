const { getData } = require('./api');
const express = require('express');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3001;

app.use(cors());

app.get('/api/server', async (req, res) => {
  try {
    const response = await getData();
    const data = await response;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
