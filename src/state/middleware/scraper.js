import axios from 'axios';
import { scraperSelectors } from 'src/state/ducks/scraper';
import store from 'src/state/store';
const { getState, dispatch } = store;

const fetchWeather = async (city, unit='metric') => {

  const weather_key = scraperSelectors.getWeatherKey(getState());
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather_key}&units=${unit}`;

  return (await axios.get(url));
};

export {
  fetchWeather,
};
