import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const firstOperand = ref(0);
    const secondOperand = ref(0);
    const operator = ref('sum');

    const result = computed(() => {
      switch (operator.value) {
        case 'sum':
          return firstOperand.value + secondOperand.value;
        case 'subtract':
          return firstOperand.value - secondOperand.value;
        case 'multiply':
          return firstOperand.value * secondOperand.value;
        case 'divide':
          return secondOperand.value !== 0 ? firstOperand.value / secondOperand.value : 'Error';
        default:
          return 0;
      }
    });

    return {
      firstOperand,
      secondOperand,
      operator,
      result
    };
  },

  template: `
    <div class="calculator">
      <input type="number" v-model="firstOperand" aria-label="First operand" />

      <div class="calculator__operators">
        <label><input type="radio" name="operator" value="sum" v-model="operator"/>➕</label>
        <label><input type="radio" name="operator" value="subtract" v-model="operator"/>➖</label>
        <label><input type="radio" name="operator" value="multiply" v-model="operator"/>✖</label>
        <label><input type="radio" name="operator" value="divide" v-model="operator"/>➗</label>
      </div>

      <input type="number" v-model="secondOperand" aria-label="Second operand" />

      <div>=</div>

      <output>{{ result }}</output>
    </div>
  `,
});
