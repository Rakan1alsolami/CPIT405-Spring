const ACCESS_KEY = 'd708b290-d144-446d-97f2-2cf8a05d3e14'; 
const BASE_URL = 'https://api.unsplash.com/search/photos';

// DOM Element References
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const methodSelect = document.getElementById('methodSelect');
const imageGrid = document.getElementById('imageGrid');

// --- EVENT HANDLERS ---

// 1. Mouse Event: Clicking the search button
searchBtn.addEventListener('click', () => {
    triggerSearch();
});

// 2. Keyboard Event: Pressing 'Enter' inside the input box
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        triggerSearch();
    }
});

function triggerSearch() {
    const query = searchInput.value.trim();
    if (!query) {
        alert('Please enter a search term!');
        return;
    }

    const selectedMethod = methodSelect.value;
    
    // Determine which API consumption method to execute
    if (selectedMethod === 'xhr') {
        fetchWithXHR(query);
    } else if (selectedMethod === 'promises') {
        fetchWithPromises(query);
    } else if (selectedMethod === 'asyncAwait') {
        fetchWithAsyncAwait(query);
    }
}

// --- DOM MANIPULATION FUNCTION ---
// Dynamically creates and injects HTML structural cards for images
function displayImages(photos) {
    // Clear previous results
    imageGrid.innerHTML = '';

    if (photos.length === 0) {
        imageGrid.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">No images found. Try another search!</p>';
        return;
    }

    photos.forEach(photo => {
        // Create elements using DOM API
        const card = document.createElement('div');
        card.classList.add('image-card');

        const img = document.createElement('img');
        img.src = photo.urls.small;
        img.alt = photo.alt_description || 'Unsplash Image';

        const caption = document.createElement('p');
        caption.textContent = photo.description || photo.alt_description || 'Untitled';

        // Assemble the card layout
        card.appendChild(img);
        card.appendChild(caption);
        
        // Append to the grid container
        imageGrid.appendChild(card);
    });
}


// ==========================================
// METHOD 1: XMLHttpRequest (XHR)
// ==========================================
function fetchWithXHR(query) {
    console.log('Fetching using XHR...');
    const xhr = new XMLHttpRequest();
    const url = `${BASE_URL}?query=${encodeURIComponent(query)}`;

    xhr.open('GET', url, true);
    
    // Set authorization header
    xhr.setRequestHeader('Authorization', `Client-ID ${ACCESS_KEY}`);

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            displayImages(data.results);
        } else {
            console.error('XHR Error:', xhr.statusText);
        }
    };

    xhr.onerror = function() {
        console.error('Network Error with XHR');
    };

    xhr.send();
}


// ==========================================
// METHOD 2: Fetch API with Promises (.then)
// ==========================================
function fetchWithPromises(query) {
    console.log('Fetching using Fetch + Promises...');
    const url = `${BASE_URL}?query=${encodeURIComponent(query)}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Client-ID ${ACCESS_KEY}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        displayImages(data.results);
    })
    .catch(error => {
        console.error('Fetch Promise Error:', error);
    });
}


// ==========================================
// METHOD 3: Fetch API with Async / Await
// ==========================================
async function fetchWithAsyncAwait(query) {
    console.log('Fetching using Async/Await...');
    const url = `${BASE_URL}?query=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Client-ID ${ACCESS_KEY}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displayImages(data.results);
        
    } catch (error) {
        console.error('Async/Await Error:', error);
    }
}