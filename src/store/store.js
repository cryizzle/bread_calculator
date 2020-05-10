import Vue from 'vue';
import Vuex from 'vuex';
import IngredientGroupEnum from '../constants/IngredientGroupEnum';
import IngredientTypeEnum from '../constants/IngredientTypeEnum';
import IngredientModel from '../model/IngredientModel';

const _ = require('lodash');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ingredients: {},
  },
  getters: {
    flours(state) {
      return _.filter(state.ingredients, { type: IngredientTypeEnum.FLOUR });
    },
    waters(state) {
      return _.filter(state.ingredients, { type: IngredientTypeEnum.WATER });
    },
    starter(state) {
      return _.filter(state.ingredients, { type: IngredientTypeEnum.STARTER });
    },
    containsLevain(state) {
      return _.filter(state.ingredients, { type: IngredientTypeEnum.LEVAIN }).length > 0;
    },
    levain(state) {
      return _.filter(state.ingredients, { group: IngredientGroupEnum.LEVAIN });
    },
  },
  mutations: {
    deleteIngredients(state, {
      key,
    }) {
      Vue.delete(state.ingredients, key);
    },
    setIngredient(state, ingredient) {
      Vue.set(state.ingredients, ingredient.key, ingredient);
    },
  },
  actions: {
    addIngredients({ commit }, {
      key, type, amount, group,
    }) {
      const ingredient = new IngredientModel(key, amount, type, group);
      commit('setIngredient', ingredient);
    },
    deleteIngredients({ commit }, {
      key,
    }) {
      commit('deleteIngredients', {
        key,
      });
    },
    updateIngredients({ commit, state }, { key, amount, name }) {
      const ingredient = state.ingredients[key];
      if (ingredient != null) {
        ingredient.amount = amount;
        ingredient.name = name;
        commit('setIngredient', ingredient);
      }
    },
    scaleIngredientByPercentage({ commit, state }, { key, percentage }) {
      const curAmount = state.ingredients[key].amount;
      const newAmount = curAmount * (percentage / 100.0);
      const ingredient = state.ingredients[key];
      ingredient.amount = newAmount;
      commit('setIngredient', ingredient);
    },
    scaleRecipeByPercentage({ dispatch, state }, percentage) {
      _.forEach(state.ingredients, (ingredient) => {
        dispatch('scaleIngredientByPercentage', {
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
