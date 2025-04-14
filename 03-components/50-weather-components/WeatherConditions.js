import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WeatherConditions',

  props: {
    weather: {
      type: Object,
      required: true,
    },
    temp: {
      type: Number,
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
  },

  template: `
    <div class="weather-conditions">
      <div class="weather-conditions__icon" :title="weather.description">{{ weatherIcons[weather.id] }}️</div>
      <div class="weather-conditions__temp">{{ kelvinToCelsius(temp) }} °C</div>
    </div>
  `,
})
