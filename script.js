// URL of the API to fetch radio stations
const API_URL = "https://de1.api.radio-browser.info/json/stations";

// Function to fetch data from the API
async function fetchRadioStations() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data; // Returning the complete list of stations
  } catch (error) {
    console.error("Error fetching radio stations:", error);
  }
}

// Function to render the list of radio stations
function renderRadioStations(stations) {
  const radioList = document.getElementById("radio-list");
  radioList.innerHTML = ""; // Clear existing content

  // Limit the number of stations to display for performance reasons
  const stationsToDisplay = stations.slice(0, 20);

  stationsToDisplay.forEach((station) => {
    const radioItem = document.createElement("div");
    radioItem.className = "radio-item";
    radioItem.innerHTML = `<i class="fas fa-play-circle"></i> ${station.name}`;
    radioItem.addEventListener("click", () => playStation(station));
    radioList.appendChild(radioItem);
  });
}

// Function to play the selected radio station
function playStation(station) {
  const stationName = document.getElementById("station-name");
  const audioSource = document.getElementById("audio-source");
  const audioPlayer = document.getElementById("audio-player");

  stationName.textContent = station.name;
  audioSource.src = station.url_resolved; // Updated to use the new API's stream URL field
  audioPlayer.load(); // Load the new source
  audioPlayer.play(); // Automatically play the new station
}

// Initialize the radio component
async function init() {
  const stations = await fetchRadioStations();
  renderRadioStations(stations);
}

// Run the initialization
init();
