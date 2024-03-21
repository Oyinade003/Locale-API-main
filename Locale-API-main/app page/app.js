// Authentication functions
async function login(email, password) {
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (data.success) {
    // Store the API key in local storage
    localStorage.setItem('apiKey', data.apiKey);
    showData();
    hideAuthForms();
  } else {
    console.error('Login failed:', data.error);
  }
}

async function register(email, password) {
  const response = await fetch('/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (data.success) {
    // Store the API key in local storage
    localStorage.setItem('apiKey', data.apiKey);
    showData();
    hideAuthForms();
  } else {
    console.error('Registration failed:', data.error);
  }
}

// Data fetching and rendering
async function fetchData(url, apiKey) {
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

function renderData(data, targetElement) {
  const target = document.getElementById(targetElement);
  target.innerHTML = '';

  if (Array.isArray(data)) {
    const list = document.createElement('ul');
    data.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = item.name;
      list.appendChild(listItem);
    });
    target.appendChild(list);
  } else {
    target.textContent = 'No data available';
  }
}

async function showData() {
  const apiKey = localStorage.getItem('apiKey');

  if (apiKey) {
    const data = await fetchData('/data', apiKey);
    renderData(data.regions, 'regions');
    renderData(data.states, 'states');
    renderData(data.lgas, 'lgas');
  } else {
    console.error('API key not found');
  }
}

// UI functions
function showAuthForms() {
  const authSection = document.getElementById('auth-section');
  authSection.classList.remove('hidden');
}

function hideAuthForms() {
  const authSection = document.getElementById('auth-section');
  authSection.classList.add('hidden');
}

// Event listeners
document.getElementById('register-link').addEventListener('click', (event) => {
  event.preventDefault();
  showAuthForms();
});

document.getElementById('login-link').addEventListener('click', (event) => {
  event.preventDefault();
  showAuthForms();
});

document.getElementById('register-btn').addEventListener('click', () => {
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  register(email, password);
});

document.getElementById('login-btn').addEventListener('click', () => {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  login(email, password);
});

// Check if the user is already authenticated
const apiKey = localStorage.getItem('apiKey');
if (apiKey) {
  showData();
} else {
  hideAuthForms();
}