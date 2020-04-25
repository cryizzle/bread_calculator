<template>
  <div class="columns">
    <div class="column is-one-third">
        <div class="control select is-small is-fullwidth">
          <select>
            <option v-for="(v,k) in options" :key="k">{{v}}</option>
          </select>
      </div>
    </div>
    <div class="column">
      <div class="field has-addons">
        <p class="control">
          <input v-if='isLevain' :value='totalLevain' class='input is-small' type='number' disabled>
          <input v-else v-model="amount" @change="handleAmountUpdate"
          class="input is-small" type="number"
           />
        </p>
        <p class="control">
          <button class="button is-static is-small">g</button>
        </p>
      </div>
    </div>
    <div class="column">
      <div class="field has-addons">
        <p class="control is-small">
          <input v-model="percentage" class="input is-small"
          type="number" max="100" min="0" step="0.01" />
        </p>
        <p class="control">
          <button class="button is-small is-static">%</button>
        </p>
      </div>
    </div>
    <div class="column">
      <div class="control">
        <button class="button is-danger is-small is-light" @click="handleDelete()">
          <fa class='icon' icon='times'/>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

const _ = require('lodash');

export default {
  data() {
    return {
      amount: 0.0,
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
    handleAmountUpdate() {
      this.updateIngredientsAmount({
        key: this.ingredientData.key,
        amount: Number(this.amount),
      });
    },
    handleDelete() {
      this.deleteIngredients({ key: this.ingredientData.key });
    },
  },
  mounted() {},
};
</script>
