module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/bread/'
    : '/',
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = 'Bread Maths';
        return args;
      });
  },
};
