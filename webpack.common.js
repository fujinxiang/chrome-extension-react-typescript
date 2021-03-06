const path = require('path');

module.exports = {
  entry: {
    popup: path.join(__dirname, 'src/popup/index.tsx'),
    options: path.join(__dirname, 'src/options/index.tsx'),
    newtab: path.join(__dirname, 'src/newtab/index.tsx'),
    backgroud: path.join(__dirname, 'src/backgroud.ts'),
    content: path.join(__dirname, 'src/content.ts'),
  },
  output: {
    path: path.join(__dirname, 'dist/js'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        exclude: /node_modules/,
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader', // Creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // Translates CSS into CommonJS
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.(svg)$/,
        exclude: /node_modules/,
        use: ['url-loader?limit=10000'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      'COMMON': path.join(process.cwd(), 'src/common'),
    },
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-bootstrap': 'ReactBootstrap',
  },
};
