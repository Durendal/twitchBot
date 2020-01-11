import * as types from './types';

//Update URL trivia questions are drawn from
const setWeatherKey = payload => ({
  type: types.SCRAPER_WEATHER_KEY,
  payload,
});

export {
  setWeatherKey,
};
