import express from 'express';
// import { getAllRegions, getAllStates, getAllLGAs } from '../controllers/data.js';
import { getAllData } from '../controllers/data.js'; 
import { getAllRegions } from '../controllers/data.js'; 
import { getAllStates } from '../controllers/data.js'; 
import { getAllLGAs } from '../controllers/data.js'; 

const router = express.Router(); 

router.get('/', getAllData);
router.get('/regions', getAllRegions);
router.get('/states', getAllStates);
router.get('/lgas', getAllLGAs);

export default router;