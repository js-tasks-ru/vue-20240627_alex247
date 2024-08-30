import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const result = ref(0);

    function resultAdd() {
      result.value++
    }

    function resultSubtract() {
      result.value--
    }

    return {
      result,
      resultAdd,
      resultSubtract
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        @click="resultSubtract"
        :disabled="result === 0"
      >➖</button>

      <span class="count" data-testid="count">{{ result }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        @click="resultAdd"
        :disabled="result === 5"
      >➕</button>
    </div>
  `,
})
