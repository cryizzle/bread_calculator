<template>
  <div class='section'>
  <div class='title is-4'>
    Hydration Level: {{hydrationLevel}}%
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

const _ = require('lodash');

export default {
  computed: {
    ...mapGetters(['flours', 'waters']),
    hydrationLevel() {
      const totalWater = _.sumBy(this.waters, (x) => x.amount);
      const totalFlour = _.sumBy(this.flours, (x) => x.amount);
      if (totalFlour <= 0) {
        return 0.0;
      }
      return _.round(100.0 * (totalWater / totalFlour), 2);
    },
  },
};

</script>
