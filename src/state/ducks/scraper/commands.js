import { client } from 'src/utils/client';
import { fetchWeather } from 'src/state/middleware/scraper';
import { parseMessage } from 'src/utils/messages';

/**
  Scrape the weather for a particular region
  @param {String} msg - The message passed from twitch chat
  @param {Object} context - The user context of the message sender
  @param {String} target - The target source/destination of msg
 */
const weather = async (msg, context, target) => {
  try {
    const { args } = parseMessage(msg, context, target, 1, '!weather <city_name> [<country_abbrev>]');
    const city = args[0];
    //const country = args.length > 1 ? `,${args[1]}` : '';
    const results = await fetchWeather(city);

    const { temp, feels_like } = results.data.main;
    const { name } = results.data;
    const { country, sunrise, sunset } = results.data.sys;
    const srise = new Date(sunrise * 1000);
    const sset = new Date(sunset * 1000);
    const message = `Weather in ${name}, ${country}: ${temp}°C, feels like:
    ${feels_like}°C Sunrise: ${srise}, Sunset: ${sset}`;
    client.say(target, message);
  } catch (error) {
    console.log(error);
  }
};

export {
  weather,
};
