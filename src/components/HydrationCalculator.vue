<template>
  <div class="section">
    <div class="title is-4">
      Hydration Level: {{hydrationLevel}}%
    </div>
    <p>
      Adjust your recipe using Hydration Levels
    </p>
    <div class="columns align-middle">
      <div class="column is-2 has-text-centered">
        0%
      </div>
      <div class="column">

    <input v-model="hydrationLevel"
    class="slider is-info is-medium is-circle is-fullwidth"
     step="1" min="0" max="120" type="range" />
      </div>
      <div class="column is-2 has-text-centered">
        120%
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import EventBus from '../event_bus/EventBus';

const _ = require('lodash');

export default {
  data() {
    return {
      hydrationInput: null,
    };
  },
  computed: {
    ...mapGetters(['flours', 'waters', 'levain']),
    hydrationLevel: {
      get() {
        if (this.hydrationInput != null) {
          return this.hydrationInput;
        }
        if (this.totalFlour <= 0) {
          return 0.0;
        }
        return _.round(100.0 * (this.totalWater / this.totalFlour), 2);
      },
      set(val) {
        this.hydrationInput = Number(val);
        const newTotalWater = (val / 100.0) * this.totalFlour;
        const newDoughWater = Math.max(0, newTotalWater - this.levainWater);

        EventBus.$emit('hydrationUpdated', {
          newDoughWater,
          isError: newTotalWater < this.levainWater,
        });
      },
    },
    totalWater() {
      return _.sumBy(this.waters, (x) => x.amount);
    },
    totalFlour() {
      return _.sumBy(this.flours, (x) => x.amount);
    },
    levainWater() {
      return _(this.levain).filter({ type: 'water' }).sumBy((x) => x.amount);
    },
  },
  mounted() {
    EventBus.$on('ingredientUpdated', () => {
      this.hydrationInput = null;
    });
  },
};

</script>
