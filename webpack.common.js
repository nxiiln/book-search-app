const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const styledComponentsTransformer = createStyledComponentsTransformer();


module.exports = {
  entry: {
    index: './src/index.tsx',
  },

  output: {
    filename: '[contenthash].js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Book Search App',
      favicon: './src/assets/favicon.svg',
    }),
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  module: {
    rules: [
      //TypeScript
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
        },
        exclude: /node_modules/,
      },

      // Images
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },

      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
}
