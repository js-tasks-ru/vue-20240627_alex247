import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'
import WeatherList from './WeatherList.js'
import './WeatherApp.css'

export default defineComponent({
  name: 'WeatherApp',

  components: {
    WeatherList,
  },

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
      <WeatherList :data="data" :weatherIcons="weatherIcons" :kelvinToCelsius="kelvinToCelsius" :hPaToMmHg="hPaToMmHg" :isNight="isNight" />
    </div>
  `,
})
