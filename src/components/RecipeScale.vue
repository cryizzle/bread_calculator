<template>
  <div class="section">
    <div class="title is-4">Scale this Recipe</div>
    <div class="columns field align-middle">
      <div v-for="type in RecipeScaleType" :key="type">
        <input
          class="is-checkradio is-small"
          :id="type"
          type="radio"
          :value="type"
          v-model="scaleType"
          :disabled="isRadioDisabled"
        />
        <label :for="type">Scale By {{type}}</label>
      </div>
    </div>
    <div v-if="scaleType === RecipeScaleType.PERCENTAGE" class="field has-addons">
      <p class="control">
        <input
          v-model="scalePercentage"
          class="input is-small"
          type="number"
          max="100"
          min="0"
          step="0.01"
        />
      </p>
      <p class="control">
        <button class="button is-static is-small">%</button>
      </p>
    </div>
    <div v-if="scaleType === RecipeScaleType.INGREDIENT" class="field has-addons">
      <div class="control">
        <div class="select is-small">
          <select v-model="scaleIngredientID">
            <optgroup
              v-for="(listByGroup, groupName) in ingredientsList"
              :key="groupName"
              :label="groupName"
            >
              <option
                v-for="ingredient in listByGroup"
                :key="ingredient.key"
                :value="ingredient.key"
                :disabled="ingredient.amount <= 0"
              >{{ingredient.name}}</option>
            </optgroup>
          </select>
        </div>
      </div>
      <p class="control">
        <input v-model="scaleAmount" class="input is-small" type="number" step="0.01" />
      </p>
      <p class="control">
        <button class="button is-static is-small">g</button>
      </p>
    </div>
    <div v-if="scaleType === RecipeScaleType.MAIN_DOUGH_FLOUR" class="field has-addons">
      <p class="control">
        <input
          v-model="scaleAmount"
          class="input is-small"
          type="number"
          max="100"
          min="0"
          step="0.01"
        />
      </p>
      <p class="control">
        <button class="button is-static is-small">g</button>
      </p>
    </div>
    <div class="buttons is-right">
      <button
        class="button is-info is-small"
        @click="handleScale"
        :disabled="isButtonDisabled"
      >Calculate</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import EventBus from '../event_bus/EventBus';

const _ = require('lodash');

const RecipeScaleType = {
  PERCENTAGE: 'Percentage',
  INGREDIENT: 'Ingredient',
  MAIN_DOUGH_FLOUR: 'Main Dough Flour',
};

export default {
  data() {
    return {
      scalePercentage: 100,
      scaleAmount: 0,
      scaleIngredientID: null,
      scaleType: null,
    };
  },
  computed: {
    ...mapState(['ingredients']),
    RecipeScaleType() {
      return RecipeScaleType;
    },
    ingredientsList() {
      return _.groupBy(this.ingredients, 'group');
    },
    isButtonDisabled() {
      if (this.scaleType == null) {
        return true;
      }
      switch (this.scaleType) {
        case RecipeScaleType.INGREDIENT:
          return this.scaleIngredientID == null || this.scaleAmount === 0;
        default:
          return false;
      }
    },
    isRadioDisabled() {
      return _.keys(this.ingredients).length <= 0;
    },
  },
  methods: {
    ...mapActions([
      'scaleRecipeByPercentage',
      'scaleRecipeByIngredient',
      'scaleRecipeByMainDough',
    ]),
    handleScale() {
      switch (this.scaleType) {
        case RecipeScaleType.PERCENTAGE:
          this.scaleRecipeByPercentage(this.scalePercentage);
          this.scalePercentage = 100;
          break;
        case RecipeScaleType.INGREDIENT:
          this.scaleRecipeByIngredient({
            key: this.scaleIngredientID,
            newAmount: this.scaleAmount,
          });
          break;
        case RecipeScaleType.MAIN_DOUGH_FLOUR:
          this.scaleRecipeByMainDough(this.scaleAmount);
          break;
        default:
          return;
      }
      EventBus.$emit('scaledRecipe');
    },
  },
};
</script>
