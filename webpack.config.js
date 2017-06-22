const path = require('path');

// creates an index.html file for you, puts it in the dist folder and 
// adds an HTML script tag to include index_bundle.js
const HtmlWebpackPlugin = require('html-webpack-plugin');

// module - loaders i.e. transformations you want to make to your files
// babel-loader will be used on all js files. Looks for babel property in package.json
// babel-preset-env - transpiles to the latest version of JS
// babel-preset-react - transpiles JSX to JS
// style-loader and css-loader will be run on all css files to ensure they are loaded into the app
module.exports = {
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader' },
            { test: /\.css$/, use: [ 'style-loader', 'css-loader'] }
        ]
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [ new HtmlWebpackPlugin({
        template: 'app/index.html'
    })]
};