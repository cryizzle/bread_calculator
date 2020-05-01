<template>
  <div>
    <section class="hero is-light">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-2 titleText">Bread Maths</h1>
          <h1 class="subtitle titleText">& Recipe Scaling</h1>
        </div>
      </div>
    </section>
    <div class="container">
      <div class="columns">
        <div class="column" v-for="group in IngredientGroupEnum" :key="group">
          <ingredients-group
            :active="isActive(group)"
            :groupName="group"
          />
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
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.titleText {
  font-family: "IM Fell English", serif;
}
</style>
