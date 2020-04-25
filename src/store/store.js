import Vue from 'vue';
import Vuex from 'vuex';

const _ = require('lodash');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ingredients: {},
    ingredientTypes: {
      flour: ['All Purpose', 'Bread', 'Whole Wheat', 'Rye'],
      water: ['Water'],
      salt: ['Salt'],
      levain: ['Levain'],
      fat: ['Butter', 'Vegetable Oil', 'Olive Oil'],
      yeast: ['Yeast'],
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
      return _.filter(state.ingredients, { group: 'levain' });
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
    updateIngredientsAmount(state, { key, amount }) {
      if (state.ingredients[key] != null) {
        Vue.set(state.ingredients[key], 'amount', amount);
      }
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
    updateIngredientsAmount({ commit }, { key, amount }) {
      commit('updateIngredientsAmount', { key, amount });
    },
  },
  modules: {
  },
});
