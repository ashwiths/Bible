const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env variables
dotenv.config();

// Connect to database (Uncomment when you have a valid MONGO_URI in .env)
// connectDB();

const app = express();

// Middleware
// Enable CORS so the frontend can make requests to this backend
app.use(cors());
// Built-in middleware to parse JSON request bodies
app.use(express.json());

// Base Route
app.get('/', (req, res) => {
  res.send('DuoBible Backend Running 🚀');
});

// API Routes
app.use('/api/bible', require('./routes/bibleRoutes'));
app.use('/api/search', require('./routes/searchRoutes'));
app.use('/api/verseoftheday', require('./routes/votdRoutes'));

// Basic Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
