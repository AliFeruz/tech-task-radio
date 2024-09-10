const API_URL = "https://de1.api.radio-browser.info/json/stations";


async function fetchRadioStations() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching radio stations:", error);
  }
}

function renderRadioStations(stations) {
  const radioList = document.getElementById("radio-list");
  radioList.innerHTML = ""; 

  const stationsToDisplay = stations.slice(0, 30);

  stationsToDisplay.forEach((station) => {
    const radioItem = document.createElement("div");
    radioItem.className = "radio-item";
    radioItem.innerHTML = `<i class="fas fa-play-circle"></i> ${station.name}`;
    radioItem.addEventListener("click", () => playStation(station));
    radioList.appendChild(radioItem);
  });
}

function playStation(station) {
  const stationName = document.getElementById("station-name");
  const audioSource = document.getElementById("audio-source");
  const audioPlayer = document.getElementById("audio-player");

  stationName.textContent = station.name;
  audioSource.src = station.url_resolved; 
  audioPlayer.load(); 
  audioPlayer.play(); 
}


async function init() {
  const stations = await fetchRadioStations();
  renderRadioStations(stations);
}


init();
