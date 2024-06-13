// For Restaurant API
app.get('/api/restaurants', async (req, res) => {
    const { lat, lng, page_type } = req.query;
    console.log(req.query);

    const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=${page_type}`;

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
            throw new Error(`Network response was not ok: ${response.statusText}, Response: ${errorText}`);
        }

        const data = await response.json();
        console.log('Restaurant data:', data);
        res.json(data);
    } catch (error) {
        console.error('Error fetching restaurant data:', error);
        console.error(error.stack); // Log full stack trace
        res.status(500).json({ error: `An error occurred while fetching restaurant data: ${error.message}` });
    }
});

// For Menu API
app.get('/api/menu', async (req, res) => {
    const { 'page-type': page_type, 'complete-menu': complete_menu, lat, lng, restaurantId } = req.query;
    console.log(req.query);

    const url = `https://www.swiggy.com/dapi/menu?page-type=${page_type}&complete-menu=${complete_menu}&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}`;

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
            throw new Error(`Network response was not ok: ${response.statusText}, Response: ${errorText}`);
        }

        const data = await response.json();
        console.log('Menu data:', data);
        res.json(data);
    } catch (error) {
        console.error('Error fetching menu data:', error);
        console.error(error.stack); 
        res.status(500).json({ error: `An error occurred while fetching menu data: ${error.message}` });
    }
});
