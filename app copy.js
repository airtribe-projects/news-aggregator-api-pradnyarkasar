const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const newsRoutes = require('./routes/newsRoutes');
dotenv.config();
const app = express();

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api', newsRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
