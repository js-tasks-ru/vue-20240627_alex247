import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WeatherDetails',

  props: {
    pressure: {
      type: Number,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
    clouds: {
      type: Number,
      required: true,
    },
    windSpeed: {
      type: Number,
      required: true,
    },
    hPaToMmHg: {
      type: Function,
      required: true,
    },
  },

  template: `
    <div class="weather-details">
      <div class="weather-details__item">
        <div class="weather-details__item-label">Давление, мм рт. ст.</div>
        <div class="weather-details__item-value">{{ hPaToMmHg(pressure) }}</div>
      </div>
      <div class="weather-details__item">
        <div class="weather-details__item-label">Влажность, %</div>
        <div class="weather-details__item-value">{{ humidity }}</div>
      </div>
      <div class="weather-details__item">
        <div class="weather-details__item-label">Облачность, %</div>
        <div class="weather-details__item-value">{{ clouds }}</div>
      </div>
      <div class="weather-details__item">
        <div class="weather-details__item-label">Ветер, м/с</div>
        <div class="weather-details__item-value">{{ windSpeed }}</div>
      </div>
    </div>
  `,
})
