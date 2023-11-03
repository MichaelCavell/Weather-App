const city = 'Miami';
const key = '8f9deabd1cb74de787c191736232610';
const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;

async function checkWeather() {
    const request = await fetch(weatherUrl, {mode: 'cors'})
    const locationWeather = await request.json();
    console.log(locationWeather);
    console.log(locationWeather.current.condition.text);
    console.log(locationWeather.current.temp_c);
    console.log(locationWeather.current.temp_f);
    return locationWeather;
}

checkWeather();