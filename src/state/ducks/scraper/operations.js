import * as actions from './actions';

/**
  set a new api key for weather scraping
  @param {String} weather_key - The new api key to use
 */
const setWeatherKey = (weather_key) => async (dispatch) => {
  try {
    dispatch(actions.setWeatherKey({ weather_key }));
  } catch (error) {
    console.log(error);
  }
};

export {
  setWeatherKey,
};
