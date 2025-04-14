import { defineComponent } from 'vue'
import WeatherAlert from './WeatherAlert.js'
import WeatherConditions from './WeatherConditions.js'
import WeatherDetails from './WeatherDetails.js'

export default defineComponent({
  name: 'WeatherCard',

  components: {
    WeatherAlert,
    WeatherConditions,
    WeatherDetails,
  },

  props: {
    elem: {
      type: Object,
      required: true,
    },
    weatherIcons: {
      type: Object,
      required: true,
    },
    kelvinToCelsius: {
      type: Function,
      required: true,
    },
    hPaToMmHg: {
      type: Function,
      required: true,
    },
    isNight: {
      type: Function,
      required: true,
    },
  },

  template: `
    <li :class="['weather-card', { 'weather-card--night': isNight(elem.current.dt, elem.current.sunrise, elem.current.sunset) }]">
      <WeatherAlert v-if="elem.alert" :alert="elem.alert" />
      <div>
        <h2 class="weather-card__name">{{ elem.geographic_name }}</h2>
        <div class="weather-card__time">{{ elem.current.dt }}</div>
      </div>
      <WeatherConditions :weather="elem.current.weather" :temp="elem.current.temp" :weatherIcons="weatherIcons" :kelvinToCelsius="kelvinToCelsius" />
      <WeatherDetails :pressure="elem.current.pressure" :humidity="elem.current.humidity" :clouds="elem.current.clouds" :windSpeed="elem.current.wind_speed" :hPaToMmHg="hPaToMmHg" />
    </li>
  `,
})
