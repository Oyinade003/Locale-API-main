import express from 'express';
 
import { searchRegions } from '../controllers/searchRegions.js'; 
import { searchStates } from '../controllers/searchRegions.js'; 
import { searchLGAs } from '../controllers/searchRegions.js'; 

const router = express.Router();

router.get('/search', searchRegions); // Add routes for state and LGA search
router.get('/search/:type', searchStates); // Replace ":type" with actual parameter
router.get('/search/:type/:stateCode', searchLGAs); // Nested route for LGA search

export default router;