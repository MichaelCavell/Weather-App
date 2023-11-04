let city = '';
const key = '8f9deabd1cb74de787c191736232610';
const form = document.getElementById('searchForm');
const img = document.querySelector('img');
const weatherDisplay = document.getElementById('weatherInfo');
img.src = 'https://media.giphy.com/media/QBjok2NBIzSR7IaDQK/giphy.gif';
let weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;
let gifURL = '';
const weatherObject = {
    location: '',
    condition: '',
    cTemp: '',
    fTemp: '',
    tempScale: "°F"
}

function constructURL() {
    weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;
}

function constructGifURL() {
  gifURL = `https://api.giphy.com/v1/gifs/translate?api_key=RPiCtbnnkE32XKNfgz9ORO7ZE8z3bKQ3&s= ${weatherObject.condition}`;
}

async function checkWeather() {
    const request = await fetch(weatherUrl, {mode: 'cors'})
    const locationWeather = await request.json();
    return locationWeather;
}

async function weatherPush() {
    const weatherDetails = await checkWeather();
    weatherObject.location = city
    weatherObject.condition = weatherDetails.current.condition.text 
    weatherObject.cTemp = weatherDetails.current.temp_c
    weatherObject.fTemp = weatherDetails.current.temp_f
}

async function addDisplayElements() {
    while (weatherDisplay.firstChild) {
        weatherDisplay.removeChild(weatherDisplay.firstChild);
    }
    const currentCityTemp = document.createElement('div');
    const tempToggle = document.createElement('button');

    if (weatherObject.tempScale === "°C") {
        currentCityTemp.textContent = `The current temperature in ${city} is ${weatherObject.cTemp} ${weatherObject.tempScale}`
    } else {
        currentCityTemp.textContent = `The current temperature in ${city} is ${weatherObject.fTemp} ${weatherObject.tempScale}` 
    }
    
    tempToggle.textContent = "Toggle °C/°F";

    weatherDisplay.appendChild(currentCityTemp);
    weatherDisplay.appendChild(tempToggle);

    await fetchImage();

    // eslint-disable-next-line no-use-before-define
    tempToggle.addEventListener('click', toggleTemp);
}

function toggleTemp() {
    if (weatherObject.tempScale === "°C") {
        weatherObject.tempScale = "°F"
    } else {
        weatherObject.tempScale = "°C"
    }
    addDisplayElements();
}

function updateDisplayInfo() {
    addDisplayElements();
}

async function submitForm(event) {
  event.preventDefault();
  city = form.elements.search.value;
  constructURL();
  await weatherPush();
  constructGifURL();
  updateDisplayInfo();
  form.elements.search.value = 'Enter Location';
}

form.addEventListener('submit', submitForm);



  
function fetchImage() {
  fetch(gifURL, {mode: 'cors'})
  .then((response) => response.json())
  .then((response) => {
    if (response.data.images && response.data.images.original.url) {
      img.src = response.data.images.original.url;
    } else if (response.meta.msg === "Unauthorized") {
      img.src = 'https://media.giphy.com/media/BsQAVgY6ksvIY/giphy.gif'
    } else {
      img.src = 'https://media.giphy.com/media/xGdvlOVSWaDvi/giphy.gif'
    }
  })
  .catch(() => {
    img.src = 'https://media.giphy.com/media/BsQAVgY6ksvIY/giphy.gif'
  })
}





