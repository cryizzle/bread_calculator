// import IngredientGroupEnum from '../constants/IngredientGroupEnum';
import IngredientTypeEnum from '../constants/IngredientTypeEnum';

class IngredientModel {
  constructor(key, amount, type, group, name = '') {
    this._key = key;
    this._amount = amount;
    this._type = type;
    this._group = group;
    this._name = name;
  }

  get key() {
    return this._key;
  }

  get amount() {
    return this._amount;
  }

  get type() {
    return this._type;
  }

  get group() {
    return this._group;
  }

  get name() {
    return this._name;
  }

  get isCustom() {
    return this._type === IngredientTypeEnum.CUSTOM;
  }

  get isLevain() {
    return this._type === IngredientTypeEnum.LEVAIN;
  }

  isType(type) {
    return this._type === type;
  }

  isGroup(group) {
    return this._group === group;
  }

  set amount(amount) {
    this._amount = amount;
  }

  set name(name) {
    this._name = name;
  }
}

export default IngredientModel;
