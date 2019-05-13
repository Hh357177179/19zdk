const path = require('path');

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/variable.less'),
      ],
    },
  },
};
// module.exports = {
//   chainWebpack: config => {
//     const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
//     types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
//   }
// }

// function addStyleResource(rule) {
//   rule.use('style-resource')
//     .loader('style-resources-loader')
//     .options({
//       patterns: [path.resolve(__dirname, './src/assets/varuables.less')],
//     })
// }