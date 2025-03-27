const axios = require('axios');
const User = require('../models/user'); 
require('dotenv').config(); 

const NEWS_API_KEY = process.env.NEWS_API_KEY; 

exports.getNews = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { preferences } = user; 
        const newsUrl = `https://newsapi.org/v2/top-headlines?category=${preferences.category}&language=${preferences.language}&apiKey=${NEWS_API_KEY}`;


        const response = await axios.get(newsUrl);

        if (response.data.status !== "ok") {
            return res.status(500).json({ message: "Error fetching news", error: response.data });
        }

        res.json({ news: response.data.articles });

    } catch (error) {
        console.error("Error fetching news:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
