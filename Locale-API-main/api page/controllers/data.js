// const Region = require('../data.ts');
// const State = require('../data.ts');
// const LGA = require('../data.ts');

import { Region } from './map.js'; 
// import { State } from './map.js'; 

// const allLGAs = regions.flatMap(region => region.states.flatMap(state => state.lgas));


// ... implement functions to retrieve all regions, states, and LGAs
export const getAllData = async (req, res) => {
  try {
    const regions = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Region);
      }, 1000); 
    });

    return res.json(regions);
        
  } catch (error) {
    console.error('Error fetching regions:', error);
    res.status(500).json({ error: 'Failed to fetch regions' });
  }
}

export const getAllRegions = async (req, res) => {
  try {
    const regions = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const processedRegions = Region.map(region => {
          const { states, ...rest } = region;
          return rest;
        });
        resolve(processedRegions);
      }, 1000);
    });

    return res.json(regions);
        
  } catch (error) {
    console.error('Error fetching regions:', error);
    res.status(500).json({ error: 'Failed to fetch regions' });
  }
}


export const getAllStates = async (req, res) => {
  try {
    const states = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const processedStates = Region.flatMap(region =>
          region.states.map(state => {
            const { lgas, ...rest } = state;
            return rest;
          })
        );
        resolve(processedStates);
      }, 1000); 
    });

    return res.json(states);
  } catch (error) {
    console.error('Error fetching states:', error);
    res.status(500).json({ error: 'Failed to fetch states' });
    throw error;
  }
};

export const getAllLGAs = async (req, res) => {
  try {
    const lgas = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const processedLGAs = Region.flatMap(region =>
          region.states.flatMap(state => state.lgas)
        );
        resolve(processedLGAs);
      }, 1000); // 
    });

    return res.json(lgas);
  } catch (error) {
    console.error('Error fetching LGAs:', error);
    res.status(500).json({ error: 'Failed to fetch lgas' });
    throw error;
  }
};




