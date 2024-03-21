import { Region } from './map.js';
// import { State } from './map.js';

// ... implement functions for searching regions, states, and LGAs
//SEARCH REGIONS
export const searchRegions = (req, res) => {
  const { regionName } = req.query;
  const region = Region.find((r) => r.name.toLowerCase() === regionName.toLowerCase());

  if (!region) {
    return res.status(404).json({ message: 'Region not found' });
  }

  res.json(region);
};

//SEARCH STATES
export const searchStates = (req, res) => {
  const { stateName } = req.query;

  // Find the region that contains the state with the given name
  const region = Region.find((r) =>
    r.states.some((s) => s.name.toLowerCase() === stateName.toLowerCase())
  );

  if (!region) {
    return res.status(404).json({ message: 'State not found' });
  }

  // Find the state within the region
  const state = region.states.find(
    (s) => s.name.toLowerCase() === stateName.toLowerCase()
  );

  res.json(state);
};

//SEARCH LGAs
export const searchLGAs = (req, res) => {
  const { lgaName } = req.query;

  // Find all LGAs across all regions and states
  const allLGAs = Region.flatMap(region =>
    region.states.flatMap(state => state.lgas)
  );

  // Find the LGA with the given name
  const lga = allLGAs.find(lga => lga.name.toLowerCase() === lgaName.toLowerCase());

  if (!lga) {
    return res.status(404).json({ message: 'LGA not found' });
  }

  res.json(lga);
};

//SEARCH WITH REGIONS
export const searchRegionsWithStates = (req, res) => {
  const { regionName } = req.query;

  // Find the region with the given name
  const region = Region.find((r) => r.name.toLowerCase() === regionName.toLowerCase());

  if (!region) {
    return res.status(404).json({ message: 'Region not found' });
  }

  // Create a new object with only the region and its states (without LGAs)
  const regionWithStates = {
    id: region.id,
    name: region.name,
    states: region.states.map(({ id, name }) => ({ id, name })),
  };

  res.json(regionWithStates);
};

//SEARCH STATES WITH LGAs
export const searchStatesWithLgas = (req, res) => {
  const { stateName } = req.query;

  // Find the state with the given name
  const region = Region.find((r) =>
    r.states.some((s) => s.name.toLowerCase() === decodeURIComponent(stateName).toLowerCase())
  );

  if (!region) {
    return res.status(404).json({ message: 'State not found' });
  }

  const state = region.states.find(
    (s) => s.name.toLowerCase() === decodeURIComponent(stateName).toLowerCase()
  );

  // Return the state with its LGAs
  const stateWithLGAs = {
    id: state.id,
    name: state.name,
    lgas: state.lgas,
  };

  res.json(stateWithLGAs);
};


