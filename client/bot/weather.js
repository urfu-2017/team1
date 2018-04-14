const dateFormatOptions = {
    month: 'long',
    day: 'numeric',
    hour: '2-digit'
};
const kelvinToDegree = 273.15;
const secondsToMilliseconds = 1000;


function parseWeather(weather, name) {
    return {
        name,
        id: weather.weather[0].id,
        date: new Date(secondsToMilliseconds * weather.dt).toLocaleString('ru', dateFormatOptions),
        temperature: Math.round(weather.main.temp - kelvinToDegree),
        humidity: Math.round(weather.main.humidity),
        windSpeed: Math.round(weather.wind.speed),
        windDeg: Math.round(weather.wind.deg),
        cleanTime: new Date(secondsToMilliseconds * weather.dt)
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
        .then(weather => parseWeather(weather, city))
        .catch(() => undefined);
}
