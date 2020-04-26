import Vue from 'vue';
import Vuex from 'vuex';
import IngredientGroupEnum from '../constants/IngredientGroupEnum';

const _ = require('lodash');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ingredients: {},
    ingredientTypes: {
      flour: ['All Purpose Flour', 'Bread Flour', 'Whole Wheat Flour', 'Rye Flour'],
      water: ['Water'],
      salt: ['Salt'],
      levain: ['Levain'],
      fat: ['Butter', 'Vegetable Oil', 'Olive Oil'],
      yeast: ['Yeast'],
      custom: [],
    },
    levainIngredientsTypes: {
      flour: ['All Purpose', 'Bread', 'Whole Wheat', 'Rye'],
      water: ['Water'],
      starter: ['Sourdough Starter'],
    },
  },
  getters: {
    flours(state) {
      return _.filter(state.ingredients, { type: 'flour' });
    },
    waters(state) {
      return _.filter(state.ingredients, { type: 'water' });
    },
    containsLevain(state) {
      return _.filter(state.ingredients, { type: 'levain' }).length > 0;
    },
    levain(state) {
      return _.filter(state.ingredients, { group: IngredientGroupEnum.LEVAIN });
    },
  },
  mutations: {
    addIngredients(state, {
      key, type, amount, group,
    }) {
      Vue.set(state.ingredients, key, {
        key, amount, type, group,
      });
    },
    deleteIngredients(state, {
      key,
    }) {
      Vue.delete(state.ingredients, key);
    },
    updateIngredients(state, { key, amount, name }) {
      if (state.ingredients[key] != null) {
        Vue.set(state.ingredients[key], 'amount', amount);
        Vue.set(state.ingredients[key], 'name', name);
      }
    },
    scaleIngredientByPercentage(state, { key, percentage }) {
      const curAmount = state.ingredients[key].amount;
      const newAmount = curAmount * (percentage / 100.0);
      Vue.set(state.ingredients[key], 'amount', newAmount);
    },
  },
  actions: {
    addIngredients({ commit }, {
      key, type, amount, group,
    }) {
      commit('addIngredients', {
        key, type, amount, group,
      });
    },
    deleteIngredients({ commit }, {
      key,
    }) {
      commit('deleteIngredients', {
        key,
      });
    },
    updateIngredients({ commit }, { key, amount, name }) {
      commit('updateIngredients', { key, amount, name });
    },
    scaleRecipeByPercentage({ commit, state }, percentage) {
      _.forEach(state.ingredients, (ingredient) => {
        commit('scaleIngredientByPercentage', {
          key: ingredient.key,
          percentage,
        });
      });
    },
    scaleRecipeByIngredient({ dispatch, state }, { key, newAmount }) {
      const oldAmount = state.ingredients[key].amount;
      if (oldAmount <= 0) {
        return;
      }
      const factor = newAmount / oldAmount;
      dispatch('scaleRecipeByPercentage', factor * 100.0);
    },
    scaleRecipeByMainDough({ dispatch, getters }, newAmount) {
      const oldAmount = _(getters.flours).filter({ group: IngredientGroupEnum.MAIN_DOUGH })
        .sumBy('amount');
      if (oldAmount <= 0) {
        return;
      }
      const factor = newAmount / oldAmount;
      dispatch('scaleRecipeByPercentage', factor * 100.0);
    },
  },
});
