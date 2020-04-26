<template>
<div>
    <section class="hero is-light">
  <div class="hero-body">
    <div class="container">
      <h1 class="title is-2 titleText">
    Bread Calculator
      </h1>
    </div>
  </div>
</section>
  <div class='container'>
    <div class="columns">
      <div class="column">
        <ingredients-group :active='true' :groupName="'main dough'"
         :ingredientTypes="ingredientTypes" />
      </div>
      <div class="column">
        <ingredients-group :active='containsLevain' :groupName="'levain'"
         :ingredientTypes="levainIngredientsTypes" />
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

export default {
  components: {
    'ingredients-group': IngredientsGroup,
    'hydration-calculator': HydrationCalculator,
    'recipe-scale': RecipeScale,
  },
  computed: {
    ...mapGetters(['containsLevain']),
    ...mapState(['ingredientTypes', 'levainIngredientsTypes']),
  },
  methods: {},
  data() {
    return {};
  },
};
</script>

<style scoped>
  .titleText{
    font-family: 'IM Fell English', serif;
  }
</style>
