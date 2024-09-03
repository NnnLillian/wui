module.exports = {
  propsParser: require('react-docgen-typescript').withCustomConfig(
    './tsconfig.json'
  ).parse,
  webpackConfig: {
    module: {
      rules: [
        // Babel loader will use your project’s babel.config.js
        {
          test: /\.(jsx|tsx|js|ts)?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        // Other loaders that are needed for your components
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    }
  }
}
