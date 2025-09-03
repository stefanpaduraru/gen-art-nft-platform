const nodeExternals = require('webpack-node-externals');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@app/*': path.resolve(__dirname, '../../src/app/*'),
      '@admin/*': path.resolve(__dirname, '../../src/admin/*'),
      '@config/*': path.resolve(__dirname, '../../config/*'),
      '@common/*': path.resolve(__dirname, '../../src/common/*'),
      '@repositories/*': path.resolve(
        __dirname,
        '../../src/common/repositories/*',
      ),
      '@src/*': path.resolve(__dirname, '../../src/*'),
      '@services/*': path.resolve(
        __dirname,
        '../../src/common/services/*',
      ),
      '@types/*': path.resolve(__dirname, '../../src/common/types/*'),
    },
    plugins: [
      new TsConfigPathsPlugin({
        extensions: ['.ts', '.js'],
      }),
    ],
  },
};
