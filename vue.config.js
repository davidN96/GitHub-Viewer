module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/GitHub-Viewer/' : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/styles/index.scss";`,
      },
    },
  },
};
