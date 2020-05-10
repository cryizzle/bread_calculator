const warnIfProduction = process.env.NODE_ENV === 'production' ? 'warn' : 'off';
const errorIfProduction = process.env.NODE_ENV === 'production' ? 'error' : 'warn';

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': warnIfProduction,
    'no-debugger': warnIfProduction,
    'no-underscore-dangle': 'off',
    'indent': errorIfProduction,
    'no-unused-vars': errorIfProduction,
    'object-curly-spacing': errorIfProduction,
  },
};
