const express = require('express');
const fetch = require('node-fetch');
const app = express();
const API_KEY = 'TA_CLE_API_GOOGLE';
const CX = 'TON_CX_CUSTOM_SEARCH';

app.use(express.static('.'));

app.get('/search', async (req, res) => {
  const query = req.query.query;
  try {
    const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}`);
    const data = await response.json();
    const results = data.items.map(item => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet
    }));
    res.json({ results });
  } catch (err) {
    res.json({ results: [], error: err.message });
  }
});

app.listen(3000, () => console.log('Serveur lancé sur http://localhost:3000'));
