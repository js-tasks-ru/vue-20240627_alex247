import { defineComponent } from '../../node_modules/vue/dist/vue.esm-browser'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {
    const data = getWeatherData();
    const weatherIcons = WeatherConditionIcons;

    function kelvinToCelsius(kelvin) {
      const kelvinNumber = Number(kelvin);
      const celsius = kelvinNumber - 273.15;
      return celsius.toFixed(1);
    }

    function hPaToMmHg(hPa) {
      const hPaNumber = Number(hPa);
      const mmHg = hPaNumber * 0.75;
      return Math.round(mmHg);
    }

    function isNight(currentTime, sunrise, sunset) {
      const [currentHours, currentMinutes] = currentTime.split(':').map(Number);
      const [sunriseHours, sunriseMinutes] = sunrise.split(':').map(Number);
      const [sunsetHours, sunsetMinutes] = sunset.split(':').map(Number);

      const currentDate = new Date();
      const current = new Date(currentDate.setHours(currentHours, currentMinutes, 0, 0));
      const sunriseTime = new Date(currentDate.setHours(sunriseHours, sunriseMinutes, 0, 0));
      const sunsetTime = new Date(currentDate.setHours(sunsetHours, sunsetMinutes, 0, 0));

      if (current < sunriseTime || current > sunsetTime) {
        return true;
      }
      return false;
    }

    return {
      data,
      weatherIcons,
      kelvinToCelsius,
      hPaToMmHg,
      isNight
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
          <li v-for="elem in data" class="weather-card" :class="{ 'weather-card--night' : isNight(elem.current.dt, elem.current.sunrise, elem.current.sunset) }">
            <div class="weather-alert" v-if="elem.alert">
              <span class="weather-alert__icon">⚠️</span>
              <span class="weather-alert__description">{{ elem.alert.sender_name + ': ' + elem.alert.description}}</span>
            </div>

            <div>
              <h2 class="weather-card__name">
                {{elem.geographic_name}}
              </h2>
              <div class="weather-card__time">
                {{elem.current.dt}}
              </div>
            </div>

            <div class="weather-conditions">
              <div class="weather-conditions__icon" :title="elem.current.weather.description">{{ weatherIcons[elem.current.weather.id] }}️</div>
              <div class="weather-conditions__temp">{{ kelvinToCelsius(elem.current.temp) }} °C</div>
            </div>

            <div class="weather-details">
              <div class="weather-details__item">
                <div class="weather-details__item-label">Давление, мм рт. ст.</div>
                <div class="weather-details__item-value">{{ hPaToMmHg(elem.current.pressure) }}</div>
              </div>
              <div class="weather-details__item">
                <div class="weather-details__item-label">Влажность, %</div>
                <div class="weather-details__item-value">{{ elem.current.humidity }}</div>
              </div>
              <div class="weather-details__item">
                <div class="weather-details__item-label">Облачность, %</div>
                <div class="weather-details__item-value">{{ elem.current.clouds }}</div>
              </div>
              <div class="weather-details__item">
                <div class="weather-details__item-label">Ветер, м/с</div>
                <div class="weather-details__item-value">{{ elem.current.wind_speed }}</div>
              </div>
            </div>
          </li>
      </ul>
    </div>
  `,
})
