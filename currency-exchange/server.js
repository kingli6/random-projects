const express = require('express');
const fetch = require('node-fetch');
const { join } = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(join(__dirname, 'public')));
app.use(express.json());

// Endpoint to get a list of available currencies
app.get('/api/getCurrencies', async (req, res) => {
  const url = 'https://currency-exchange.p.rapidapi.com/listquotes';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'adea3be893msh3caead8d7ce4d6ep1a0138jsn3789b0c4b257',
      'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching currencies:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to convert an amount from one currency to another
app.post('/api/convertCurrency', async (req, res) => {
  const { from, to, amount } = req.body;
  const url = `https://currency-exchange.p.rapidapi.com/exchange?to=${to}&from=${from}&q=${amount}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'adea3be893msh3caead8d7ce4d6ep1a0138jsn3789b0c4b257',
      'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    res.json(result);
  } catch (error) {
    console.error('Error converting currency:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
