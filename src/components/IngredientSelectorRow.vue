<template>
  <div class="columns">
    <div class="column is-one-third">
      <p v-if="isCustom" class="control">
        <input v-model="customName" class="input is-small" placeholder="Input Ingredient Name" />
      </p>
      <div v-else class="control select is-small is-fullwidth">
        <select>
          <option v-for="(v,k) in options" :key="k">{{v}}</option>
        </select>
      </div>
    </div>
    <div class="column">
      <div class="field has-addons">
        <p class="control">
          <input
            v-model="amount"
            class="input is-small"
            type="number"
            :class="{
            'has-text-danger': isError
          }"
          step="0.01"
          :disabled="isLevain"
          />
        </p>
        <p class="control">
          <button
            class="button is-static is-small"
            :class="{
            'has-text-danger': isError
          }"
          >g</button>
        </p>
      </div>
    </div>
    <div class="column">
      <div class="field has-addons">
        <p class="control is-small">
          <input
            v-model="percentage"
            class="input is-small"
            type="number"
            max="100"
            min="0"
            step="0.01"
          />
        </p>
        <p class="control">
          <button class="button is-small is-static">%</button>
        </p>
      </div>
    </div>
    <div class="column">
      <div class="control">
        <button class="button is-danger is-small is-light" @click="handleDelete()">
          <fa class="icon" icon="times" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import EventBus from '../event_bus/EventBus';

const _ = require('lodash');

export default {
  data() {
    return {
      customName: '',
      amountInput: null,
      isError: false,
    };
  },
  props: {
    groupName: String,
    ingredientTypes: Object,
    ingredientData: Object,
    totalFlours: Number,
  },
  computed: {
    ...mapState(['ingredientsID', 'ingredients']),
    ...mapGetters(['levain']),
    amount: {
      get() {
        if (this.isLevain) {
          return _.round(this.totalLevain, 2);
        }
        if (this.amountInput != null) {
          return _.round(this.amountInput, 2);
        }
        return _.round(this.ingredientData.amount, 2);
      },
      set(val) {
        this.amountInput = val;
        this.isError = false;
        this.updateIngredientsAmount({
          key: this.ingredientData.key,
          amount: Number(this.amountInput),
        });
        EventBus.$emit('ingredientUpdated');
      },
    },
    isCustom() {
      return this.ingredientData.type === 'custom';
    },
    isLevain() {
      return this.ingredientData.type === 'levain';
    },
    ingredientType() {
      return this.ingredientData.type;
    },
    options() {
      return this.ingredientTypes[this.ingredientType];
    },
    percentage() {
      if (this.totalFlours <= 0) {
        return 0.0;
      }
      const amount = this.isLevain ? this.totalLevain : this.amount;
      return _.round((amount / this.totalFlours) * 100.0, 2);
    },
    totalLevain() {
      return _(this.levain).sumBy((val) => val.amount);
    },
  },
  methods: {
    ...mapActions(['updateIngredientsAmount', 'deleteIngredients']),
    handleDelete() {
      this.deleteIngredients({ key: this.ingredientData.key });
      EventBus.$emit('ingredientUpdated');
    },
  },
  mounted() {
    EventBus.$on('hydrationUpdated', ({ newDoughWater, isError }) => {
      if (
        this.ingredientType !== 'water'
        || this.ingredientData.group !== 'main dough'
      ) {
        return;
      }
      this.amount = newDoughWater;
      this.isError = isError;
    });
  },
};
</script>
