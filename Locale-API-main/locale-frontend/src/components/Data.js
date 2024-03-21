import React, { useState, useEffect } from 'react';

function Data({ apiKey, onLogout }) {
  const [data, setData] = useState({
    regions: [],
    states: [],
    lgas: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data', {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
          },
        });

        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiKey]);

  const renderData = (items, targetElement) => {
    const target = document.getElementById(targetElement);
    target.innerHTML = '';

    if (Array.isArray(items)) {
      const list = document.createElement('ul');
      items.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.textContent = item.name;
        list.appendChild(listItem);
      });
      target.appendChild(list);
    } else {
      target.textContent = 'No data available';
    }
  };

  useEffect(() => {
    renderData(data.regions, 'regions');
    renderData(data.states, 'states');
    renderData(data.lgas, 'lgas');
  }, [data]);

  return (
    <div>
      <h2>Data</h2>
      <div id="regions"></div>
      <div id="states"></div>
      <div id="lgas"></div>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Data;