import { writable, derived, get } from 'svelte/store';
import { _ } from './services/i18n';


let defaultOptions = {
    conditions: true,
    temperature: true,
    temperatureUnit: 'f',
    windspeed: true,
    windUnit: 'description',
    windDirection: true,
    windDirectionType: 'text',
    sunrise: true,
    sunset: true,
    cloudCover: true,
    humidity: true,
    icon: true,
    iconType: 'emoji',
    attr: true,
}
// Get user option preferences from local store, if no local store use default options
export const options = writable(JSON.parse(localStorage.getItem('storedOptions')) || defaultOptions);
// When options change, change the local store
options.subscribe((value) => localStorage.storedOptions = JSON.stringify(value));

let defaultLanguage = 'en';
export const language = writable(JSON.parse(localStorage.getItem('storedLanguage')) || defaultLanguage);
language.subscribe((value) => localStorage.storedLanguage = JSON.stringify(value));

export let postParsedWeather = writable(
    { 
        icon: {
        open: '',
        emoji: ''
        },
        conditions: null,
        temperature: {
        f: null,
        c: null
        },
        windspeed: {
        mph: null,
        kmh: null,
        ms: null,
        beaufort: null,
        description: null,
        },
        windDirection: {
        text: null,
        arrow: null
        },
        cloudCover: null,
        humidity: null,
        sunrise: null,
        sunset: null,
        timezone: null,
    }
);
export let preParsedWeather = writable(
    { 
        icon: {
        open: '',
        emoji: ''
        },
        conditions: null,
        temperature: {
        f: null,
        c: null
        },
        windspeed: {
        mph: null,
        kmh: null,
        ms: null,
        beaufort: null,
        description: null,
        },
        windDirection: {
        text: null,
        arrow: null
        },
        cloudCover: null,
        humidity: null,
        sunrise: null,
        sunset: null,
        timezone: null,
    }
);

function renderCopyText(options, parsedWeather) {
    let textReturn = '';
    if (options.icon) {
        if (options.iconType === 'open') {
            textReturn += parsedWeather.icon.open;
        } else if (options.iconType === 'emoji') {
            textReturn += parsedWeather.icon.emoji; 
        }
        textReturn += '\n';
    }
    if (options.conditions) {
        textReturn += parsedWeather.conditions;
        textReturn += '\n';
    }
    if (options.temperature) {
        textReturn += get(_)('weather.temperature') + ': ';
        textReturn += options.temperatureUnit === 'c' ? parsedWeather.temperature.c : parsedWeather.temperature.f;
        textReturn += '\n';
    }
    if (options.windspeed) {
        textReturn += get(_)('weather.wind') + ': ';
        if (options.windUnit === 'description') {
            textReturn += parsedWeather.windspeed.description;
        } else if (options.windUnit === 'beaufort') {
            textReturn += 'Beaufort force '
            textReturn += parsedWeather.windspeed.beaufort;
        } else if (options.windUnit === 'mph') {
            textReturn += parsedWeather.windspeed.mph;
        } else if (options.windUnit === 'kmh') {
            textReturn += parsedWeather.windspeed.kmh;
        } else if (options.windUnit === 'ms') {
            textReturn += parsedWeather.windspeed.ms;
        }
        textReturn += '\n';
    }
    if (options.windDirection) {
        textReturn += get(_)('weather.wind_direction') + ': ';
        textReturn += parsedWeather.windDirection.text;
        textReturn += '\n';
    }
    if (options.cloudCover) {
        textReturn += get(_)('weather.cloud_cover') + ': ';
        textReturn += parsedWeather.cloudCover;
        textReturn += '\n';
    }
    if (options.humidity) {
        textReturn += get(_)('weather.humidity') + ': ';
        textReturn += parsedWeather.humidity;
        textReturn += '\n';
    }
    if (options.sunrise) {
        textReturn += get(_)('weather.sunrise') + ': ';
        textReturn += parsedWeather.sunrise;
        textReturn += '\n';
    }
    if (options.sunset) {
        textReturn += get(_)('weather.sunset') + ': ';
        textReturn += parsedWeather.sunset;
        textReturn += '\n';
    }
    if (options.attr) {
        textReturn += get(_)('weather.generated_by');
        textReturn += '\n';
    }
    return textReturn;
}

export let postWeatherCopy = derived(
    [options, postParsedWeather],
    ([$options, $postParsedWeather]) => {
        return renderCopyText($options, $postParsedWeather);
    }
)
export let preWeatherCopy = derived(
    [options, preParsedWeather],
    ([$options, $preParsedWeather]) => {
        return renderCopyText($options, $preParsedWeather);
    }
)

export let postStatus = writable('init');
export let preStatus = writable('init');

export let aboutView = writable(false);