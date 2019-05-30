module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        // loose: false,
        modules: 'cjs',
        useBuiltIns: 'entry',
        // modules: 'commonjs',
      },
    ],
    // 'es2015',
    // '@babel/preset-stage-2',
    // '@babel/preset-typescript',
  ],
  plugins: [
    // 结合 webpack 和 @babel/preset-env 使用
    '@babel/plugin-syntax-dynamic-import',
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
      },
    ],
    // 'babel-plugin-module-resolver',

    // https://babeljs.io/docs/en/plugins
    // https://github.com/babel/babel-preset-env/blob/1.x/data/plugin-features.js

    // ES2016
    // '@babel/runtime',
    // [
    //   'module-resolver',
    //   {
    //     root: ['./src'],
    //     alias: {},
    //   },
    // ],
    // Experimental
    //装饰器
    // '@babel/plugin-proposal-decorators',
    '@babel/plugin-proposal-throw-expressions',
    '@babel/plugin-proposal-class-properties', // 这个要写在 plugin-transform-classes 前面
    // https://babeljs.io/docs/en/babel-plugin-proposal-export-default-from
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-syntax-export-namespace-from',
    // ES2018
    // 低版本支付宝10.1.55 不支持对象的解析运算(10.1.62支持) 甚至浏览器
    '@babel/plugin-proposal-object-rest-spread',
    // ES2017
    // '@bable/plugin-transform-async-to-generator',
    // ES2015
    '@babel/plugin-transform-classes',
    '@babel/plugin-transform-template-literals',
    // Modules
    '@babel/plugin-transform-modules-commonjs',
    // https://babeljs.io/docs/en/babel-helper-module-imports
    // '@babel/helper-module-imports', // 这个报错
    // https://www.npmjs.com/package/babel-plugin-add-module-exports
    'add-module-exports',
  ],
  env: {
    // production: {
    //   plugins: ['transform-es2015-modules-commonjs'],
    // },
  },
};
