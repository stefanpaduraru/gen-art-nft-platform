const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const glob = require('glob');

module.exports = merge(common, {
  entry: glob
    .sync(path.resolve(__dirname, '../../src/common/migrations/*.ts'))
    .reduce(
      (entries, filename) => {
        const migrationName = path.basename(filename, '.ts');
        return { ...entries, [`db/${migrationName}`]: filename };
      },
      { index: path.resolve(__dirname, '../../src/server.ts') },
    ),
  mode: 'production',
  optimization: {
    minimize: false,
    nodeEnv: 'production',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../../dist'),
    libraryTarget: 'umd',
  },
});
