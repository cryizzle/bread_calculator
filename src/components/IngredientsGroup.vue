<template>
  <div class='section'>
    <div class="title is-4">
    {{groupNameDisplay}}
    </div>
    <div v-if="active">
      <div class='buttons'>
        <button  v-for="(options, type) in ingredientTypes" :key="type"
        :disabled="!availableType(type)" class="button is-rounded is-small"
        @click="handleAddIngredient(type)">{{buttonLabel(type)}}</button>
      </div>
      <div v-for="data in ingredients" :key="data.key">
        <ingredient-selector-row
          v-if="data.group === groupName"
          :totalFlours="totalFlours"
          :ingredientData="data"
          :ingredientTypes="ingredientTypes"
        />
      </div>
    </div>
    <div v-else>{{groupNameDisplay}} is not added</div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import IngredientSelectorRow from '@/components/IngredientSelectorRow.vue';

const _ = require('lodash');

export default {
  components: {
    'ingredient-selector-row': IngredientSelectorRow,
  },
  props: {
    active: Boolean,
    groupName: String,
    ingredientTypes: Object,
  },
  computed: {
    ...mapState(['ingredients']),
    ...mapGetters(['flours', 'levain']),
    groupNameDisplay() { return _.startCase(this.groupName); },
    totalFlours() {
      return _(this.flours)
        .filter({ group: this.groupName })
        .sumBy((val) => val.amount);
    },
    singleTypes() {
      return _(this.ingredientTypes)
        .pickBy((options) => options.length === 1)
        .keys()
        .value();
    },
    excludedTypes() {
      const arr = [];
      const selectedTypes = _(this.ingredients)
        .filter((val) => val.group === this.groupName)
        .map((val) => val.type).value();
      _.forEach(this.singleTypes, (type) => {
        if (selectedTypes.indexOf(type) > -1) {
          arr.push(type);
        }
      });
      return arr;
    },
  },
  methods: {
    ...mapActions(['addIngredients', 'deleteIngredients']),
    handleAddIngredient(type) {
      this.addIngredients({
        key: _.uniqueId(),
        type,
        amount: 0.0,
        group: this.groupName,
      });
    },
    availableType(type) {
      return this.excludedTypes.indexOf(type) === -1;
    },
    buttonLabel(type) {
      return _.startCase(type);
    },
  },
};

</script>
