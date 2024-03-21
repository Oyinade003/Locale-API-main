import express from 'express';
 
import { searchRegions } from '../controllers/searchRegions.js'; 
import { searchStates } from '../controllers/searchRegions.js'; 
import { searchLGAs } from '../controllers/searchRegions.js'; 
import { searchRegionsWithStates } from '../controllers/searchRegions.js'; 
import { searchStatesWithLgas } from '../controllers/searchRegions.js';

const router = express.Router();

router.get('/regions/:regionId', searchRegions); 
router.get('/states/:stateId', searchStates); 
router.get('/lgas/:lgaId', searchLGAs);
router.get('/regions/states/:regionId', searchRegionsWithStates);
router.get('/states/lgas/:stateId', searchStatesWithLgas);

export default router;