import { Region } from './map.js';

// ... implement functions for searching regions, states, and LGAs
//SEARCH REGIONS
export const searchRegions = async (query) => {
  try {
    const results = await Region.find({
      $text: { $search: query, $caseSensitive: false },
    });

    return results;
  } catch (error) {
    console.error('Error searching regions:', error);
    res.status(500).json({ error: 'Failed to fetch regions' });
  }
};

//SEARCH STATES
export const searchStates = async (query) => {
  try {
    const results = await State.find({
      $or: [
        { name: { $regex: new RegExp(query, 'i') } },
        { region: query }, 
      ],
    });

    return results;
  } catch (error) {
    console.error('Error searching states:', error);
    res.status(500).json({ error: 'Failed to fetch state' });
  }
};

//SEARCH LGAs
export const searchLGAs = async (query) => {
  try {
    const results = await LocalGovernmentArea.find({
      $or: [
        { name: { $regex: new RegExp(query, 'i') } },
        { state: query }, 
      ],
    });

    return results;
  } catch (error) {
    console.error('Error searching LGAs:', error);
    res.status(500).json({ error: 'Failed to fetch lga' });
  }
};


