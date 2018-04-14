'use strict';


const fs = require('fs');
const { format } = require('url');
const path = require('path');

const request = require('request-promise-native');


const cities = JSON.parse(fs.readFileSync(path.join(__dirname, './cities.json'), 'utf-8'));


function translateCityName(cityInRussian) {
    return getResponse(createUrl(
        'https',
        'translate.yandex.net',
        'api/v1.5/tr.json/translate',
        {
            key: 'trnsl.1.1.20171125T083420Z.cb9d38c1bcd1d2e6.956c53d3350ff265c8064feec4d0e45873157189',
            text: cityInRussian,
            lang: 'ru-en'
        }
    ));
}

function getWeatherById(cityId) {
    return getResponse(createUrl(
        'http',
        'api.openweathermap.org',
        'data/2.5/weather',
        {
            id: `${cityId}`,
            APPID: '395cf740351f6e429a4f9c2473d775f7'
        }
    ));
}

function getResponse(url) {
    return request(url).then(JSON.parse);
}

function createUrl(protocol, host, pathname, params) {
    return format({
        protocol,
        host,
        pathname,
        query: params
    });
}

module.exports = async function getWeatherByCity(russianName) {
    const englishName = (await translateCityName(russianName)).text[0];
    const cityMetaData = cities.find(city => city.name === englishName);
    if (!cityMetaData) {
        return;
    }

    return getWeatherById(cityMetaData.id);
};

// getWeatherByCity('Екатеринбург').then(console.log);
