const dateFormatOptions = {
    month: 'long',
    day: 'numeric'
};
const kelvinToDegree = -273.15;


function parseWeather(weather, name) {
    return {
        name,
        id: weather[0].id,
        date: new Date(weather.dt).toLocaleString('en', dateFormatOptions),
        temperature: weather.main.temp - kelvinToDegree,
        humidity: weather.main.humidity,
        windSpeed: weather.wind.speed,
        windDeg: weather.wind.deg
    };
}


export default async function getWeather(city) {
    const url = `api/rest/weather?city=${city}`;
    const options = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET',
        credentials: 'same-origin'
    };

    return fetch(url, options)
        .then(response => response.json())
        .then(weather => parseWeather(weather, city));
}
