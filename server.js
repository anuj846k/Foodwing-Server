const express = require('express');
const cors = require('cors');
const fetch = require('cross-fetch');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

const fetchFromSwiggy = async (url) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error fetching data from Swiggy URL: ${url}`);
      console.error(`Response Status: ${response.status}, StatusText: ${response.statusText}`);
      console.error(`Response Text: ${errorText}`);
      throw new Error(`Network response was not ok: ${response.statusText}, Response: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data from Swiggy:', error);
    throw error;
  }
};

app.get('/api/restaurants', async (req, res) => {
  const { lat, lng, page_type } = req.query;
  console.log('Fetching restaurants with query:', req.query);

  const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=${page_type}`;

  try {
    const data = await fetchFromSwiggy(url);
    console.log('Restaurant data:', data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: `An error occurred while fetching restaurant data: ${error.message}` });
  }
});

app.get('/api/menu', async (req, res) => {
  const { 'page-type': page_type, 'complete-menu': complete_menu, lat, lng, restaurantId } = req.query;
  console.log('Fetching menu with query:', req.query);

  const url = `https://www.swiggy.com/dapi/menu/pl?page-type=${page_type}&complete-menu=${complete_menu}&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}`;

  try {
    const data = await fetchFromSwiggy(url);
    console.log('Menu data:', data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: `An error occurred while fetching menu data: ${error.message}` });
  }
});

app.get('/', (req, res) => {
  res.json({ "test": "Welcome to Foodwing! - See Live Web URL for this Server - https://food-wing.vercel.app/" });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
