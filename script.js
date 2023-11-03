const city = 'Miami';
const key = '8f9deabd1cb74de787c191736232610';
const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;
const weatherObject = {
    condition: '',
    cTemp: '',
    fTemp: '',
}

async function checkWeather() {
    const request = await fetch(weatherUrl, {mode: 'cors'})
    const locationWeather = await request.json();
    return locationWeather;
}

async function weatherPush() {
    const weatherDetails = await checkWeather();
    weatherObject.condition = weatherDetails.current.condition.text 
    weatherObject.cTemp = weatherDetails.current.temp_c
    weatherObject.fTemp = weatherDetails.current.temp_f
    console.log(weatherObject);
}

weatherPush();