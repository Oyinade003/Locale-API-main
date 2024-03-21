import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';

// const helmet = require('helmet'); // For security headers

// Import routes
import authenticationRoute from './routes/auth.js';
import searchRoute from './routes/search.js';
import dataRoute from './routes/data.js';

const router = express.Router();

const app = express();

app.use(express.json());

// Middleware setups
app.use(bodyParser.json());
app.use(cors()); // Configure CORS restrictions if needed
// app.use(helmet()); // Use appropriate security headers

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/locale';

mongoose.connect(MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


// API Routes
app.use('/auth', authenticationRoute);
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
