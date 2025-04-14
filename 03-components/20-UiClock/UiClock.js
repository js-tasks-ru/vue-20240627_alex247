import { defineComponent, ref, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  name: 'UiClock',

  setup() {
    const currentTime = ref(new Date());

    const updateClock = () => {
      currentTime.value = new Date();
    };

    let intervalId;

    onMounted(() => {
      intervalId = setInterval(updateClock, 1000);
    });

    onUnmounted(() => {
      clearInterval(intervalId);
    });

    const formatTime = (date) => {
      return date.toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      });
    };

    return {
      currentTime,
      formatTime,
    };
  },

  template: `
    <div class="clock">
      {{ formatTime(currentTime) }}
    </div>
  `,
});
