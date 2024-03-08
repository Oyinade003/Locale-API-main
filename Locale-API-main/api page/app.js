import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';

// const helmet = require('helmet'); // For security headers

// Import routes
// const authenticationRoute = require('./routes/auth.js');
import searchRoute from './routes/search.js';
import dataRoute from './routes/data.js';

const router = express.Router();


const app = express();

// Middleware setups
app.use(bodyParser.json());
app.use(cors()); // Configure CORS restrictions if needed
// app.use(helmet()); // Use appropriate security headers


// API Routes
// app.use('/auth', authenticationRoute);
app.use('/search', searchRoute);
app.use('/data', dataRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({ error: err.message });
});

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
