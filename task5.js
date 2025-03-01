const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const API_KEY = 'your_api_key_here';
const API_URL = 'http://www.omdbapi.com/';

async function fetchMovie(movieName) {
    try {
        const response = await axios.get(API_URL, {
            params: {
                apikey: API_KEY,
                t: movieName
            }
        });
        
        if (response.data.Response === "False") {
            return null;
        }
        
        return {
            id: response.data.imdbID,
            title: response.data.Title,
            rating: response.data.imdbRating,
            image: response.data.Poster
        };
    } catch (error) {
        console.error("Error fetching movie data:", error);
        return null;
    }
}

app.get('/movie/:movieName', async (req, res) => {
    const movieName = req.params.movieName;
    const movieData = await fetchMovie(movieName);
    
    if (!movieData) {
        return res.status(404).json({ message: 'Movie not found' });
    }
    
    res.json(movieData);
});

app.get('/movie/:movieName/best', async (req, res) => {
    const movieName = req.params.movieName;
    const movieData = await fetchMovie(movieName);
    
    if (!movieData) {
        return res.status(404).json({ message: 'Best-rated movie not found' });
    }
    
    res.json(movieData);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});