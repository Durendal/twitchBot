/* Retrieve the API key for the weather scraper */
const getWeatherKey = (state) => (
  state.scraper.weather_key
);

export {
  getWeatherKey,
};
