import * as types from './types';

const initialScraperState = {
  weather_key: process.env.WEATHER_API_KEY,
};

const scraperReducer = (state = initialScraperState, action) => {

  const { type, payload } = action;

  switch(type) {
    case types.SCRAPER_WEATHER_KEY:
      return {
        ...state,
        weather_key: payload.weather_key,
      };

    default:
      return {
        ...state,
      };
  };
};

export default scraperReducer;
