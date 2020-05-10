import IngredientGroupEnum from './IngredientGroupEnum';
import IngredientTypeEnum from './IngredientTypeEnum';

export default {
  [IngredientGroupEnum.MAIN_DOUGH]: {
    [IngredientTypeEnum.FLOUR]: ['All Purpose Flour', 'Bread Flour', 'Whole Wheat Flour', 'Rye Flour'],
    [IngredientTypeEnum.WATER]: ['Water', 'Milk', 'Juice', 'Alcohol'],
    [IngredientTypeEnum.SALT]: ['Salt'],
    [IngredientTypeEnum.LEVAIN]: ['Levain'],
    [IngredientTypeEnum.FAT]: ['Butter', 'Vegetable Oil', 'Olive Oil'],
    [IngredientTypeEnum.YEAST]: ['Yeast'],
    [IngredientTypeEnum.CUSTOM]: [],
  },
  [IngredientGroupEnum.LEVAIN]: {
    [IngredientTypeEnum.FLOUR]: ['All Purpose Flour', 'Bread Flour', 'Whole Wheat Flour', 'Rye Flour'],
    [IngredientTypeEnum.WATER]: ['Water'],
    [IngredientTypeEnum.STARTER]: ['Sourdough Starter'],
  },
};
