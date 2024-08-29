import { defineComponent, createApp } from '../../node_modules/vue/dist/vue.esm-browser'

const showDate = defineComponent({
  name: 'showDate',

  setup() {
    return {
      currentDate: `Сегодня ${new Date().toLocaleDateString(navigator.language, { dateStyle: 'long' })}`,
    }
  },

  template: `<div>
                 {{ currentDate }}
            </div>`
});

const app = createApp(showDate);
app.mount('#app');
