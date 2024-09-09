import { defineComponent } from 'vue'
import WeatherCard from './WeatherCard.js'

export default defineComponent({
  name: 'WeatherList',

  components: {
    WeatherCard,
  },

  props: {
    data: {
      type: Array,
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
    <ul class="weather-list unstyled-list">
      <WeatherCard
        v-for="elem in data"
        :key="elem.geographic_name"
        :elem="elem"
        :weatherIcons="weatherIcons"
        :kelvinToCelsius="kelvinToCelsius"
        :hPaToMmHg="hPaToMmHg"
        :isNight="isNight"
      />
    </ul>
  `,
})
