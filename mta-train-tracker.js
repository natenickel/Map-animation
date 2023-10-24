
const apiKey = 'sNG5K9DZ7sUWdxdSCYVrj2pR8';
const ctaApiUrl = 'http://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=sNG5K9DZ7sUWdxdSCYVrj2pR8=red&outputType=JSON'

// Function to create the Leaflet map
function createMap() {
  // Create a Leaflet map
  const map = L.map('map-container').setView([41.8781, -87.6298], 12); // Chicago coordinates

  // Add a tile layer)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  return map;
}

// Function to initialize the map
function initMap() {
  const map = createMap();

  // Entry point: Call the function to start fetching bus data and display markers
  fetchBusData(map);
}

// Function to fetch real-time bus data and display markers
async function fetchBusData(map) {
  try {
    const response = await fetch(`${ctaApiUrl}?apiKey=${apiKey}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch bus data');
    }

    const data = await response.json();

    // Process the data and add train markers to the map
    data.forEach(bus => {
      // Ensure the data structure matches what's being used here
      const latitude = train.latitude;
      const longitude = train.longitude; 

      // Check if latitude and longitude are valid
      if (typeof latitude === 'number' && typeof longitude === 'number') {
        L.marker([latitude, longitude])
          .addTo(map)
          .bindPopup(`Bus Number: ${bus.number}<br>Current Status: ${bus.status}`);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

// Call the initMap function to create and initialize the map
initMap();
