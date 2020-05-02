<template>
  <div>
    <nav class="navbar is-light">
      <div class="container title-text">
        <div class="navbar-brand">
          <div class="navbar-item block">
            <h1 class="title is-2">Bread Maths</h1>
            <h1 class="subtitle">& Recipe Scaling</h1>
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item flex-end">
            <button class="button is-rounded is-dark is-outlined is-small"
              @click="handleVersionUpdatesModal"
            >Version Updates</button>
          </div>
        </div>
      </div>
    </nav>
    <div class="container">
      <div class="columns">
        <div class="column" v-for="group in IngredientGroupEnum" :key="group">
          <ingredients-group :active="isActive(group)" :groupName="group" />
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <hydration-calculator />
        </div>
        <div class="column">
          <recipe-scale />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IngredientsGroup from '@/components/IngredientsGroup.vue';
import HydrationCalculator from '@/components/HydrationCalculator.vue';
import RecipeScale from '@/components/RecipeScale.vue';
import { mapState, mapGetters } from 'vuex';
import IngredientGroupEnum from '../constants/IngredientGroupEnum';

export default {
  components: {
    'ingredients-group': IngredientsGroup,
    'hydration-calculator': HydrationCalculator,
    'recipe-scale': RecipeScale,
  },
  computed: {
    ...mapGetters(['containsLevain']),
    ...mapState(['ingredientTypes', 'levainIngredientsTypes']),
    IngredientGroupEnum() {
      return IngredientGroupEnum;
    },
  },
  methods: {
    isActive(group) {
      switch (group) {
        case IngredientGroupEnum.LEVAIN:
          return this.containsLevain;
        default:
          return true;
      }
    },
    handleVersionUpdatesModal() {
      this.$modal.show({
        template: `<div>
      <p>Close using this button:</p>
    </div>`,
      });
    },
  },
};
</script>

<style scoped>
.title-text {
  font-family: "IM Fell English", serif;
}
.flex-end {
  align-items: flex-end;
}
.block {
  display: block;
}
.navbar {
  padding: 12px 0px;
}
</style>
