let city = 'Miami';
const key = '8f9deabd1cb74de787c191736232610';
const form = document.getElementById('searchForm');
const img = document.querySelector('img');
img.src = 'https://media.giphy.com/media/QBjok2NBIzSR7IaDQK/giphy.gif'
let weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;
const weatherObject = {
    location: '',
    condition: '',
    cTemp: '',
    fTemp: '',
}

function constructURL() {
    weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;
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
    console.log(weatherObject);
}

weatherPush();

function submitForm(event) {
  event.preventDefault();
  city = form.elements.search.value;
  constructURL();
  weatherPush()
  // fetchImage();
  // form.elements.search.value = '';
}

form.addEventListener('submit', submitForm);



  /*
  function fetchImage() {
  fetch(fetchURL, {mode: 'cors'})
    .then((response) => response.json())
    .then((response) => {
      if (response.data.images && response.data.images.original.url) {
      img.src = response.data.images.original.url;
      } else if (response.meta.msg == "Unauthorized") {
        img.src = 'https://media.giphy.com/media/BsQAVgY6ksvIY/giphy.gif'
      } else {
        img.src = 'https://media.giphy.com/media/xGdvlOVSWaDvi/giphy.gif'
      }
    })
    .catch(() => {
      img.src = 'https://media.giphy.com/media/BsQAVgY6ksvIY/giphy.gif'
    })
  }
  */





