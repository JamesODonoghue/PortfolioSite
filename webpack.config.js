var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var path = require('path');



module.exports = {
    entry: ['./src/index.js'],
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test:/\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(?:png|jpg|svg)$/,
                loader: 'url-loader'
            },
            {
                test: /\.csv$/,
                exclude: /node_modules/,
                use: ['csv-loader']
            },
        ]
    },
    resolve: {
        alias:{
            Assets: path.resolve(__dirname, 'src/js/assets/'),
            Helpers: path.resolve(__dirname, 'src/js/helpers/'),
            fonts: path.resolve(__dirname, 'src/styles/base/fonts/')
            
        },
        extensions: ['*', '.js', '.jsx']
    },
    devServer: {
        contentBase: './dist',
        historyApiFallback: true
    },
    plugins: [
        new ExtractTextPlugin({filename:'style.css'})
    ]
  };