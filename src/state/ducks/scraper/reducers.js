import * as types from './types';
import { scraper } from 'src/config/scraper';

const initialScraperState = {
  weather_key: scraper.weather_api_key,
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
