var path = require("path");
var webpack = require("webpack");
var extractTextPlugin = require("extract-text-webpack-plugin");
var precss = require('precss');
var autoprefixer = require('autoprefixer');


module.exports = {
    cache: true,
    entry: {
        index: './src/index'
    },
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "dist/",
        filename: "[name].js",
        chunkFilename: "[chunkhash].js"
    },
    postcss: function() {
        return [
            precss,
            autoprefixer({ browsers: ['> 1%', 'IE 7'] })
        ];
    },
    module: {
        loaders: [
            // required to write "require('./style.css')"
            {
                test: /\.css$/,
                loader: extractTextPlugin.extract("style-loader", "css-loader")
            }, {
                test: /\.less$/,
                loader: extractTextPlugin.extract("style-loader", "css-loader!postcss-loader!less-loader")
            }, {
                test: /src[\/\\](modules)[\/\\].+\.html$/,
                loader: 'ngtemplate?relativeTo=' + (path.resolve(__dirname, './src')) + '/!html'
            }, {
                test: /\.js$/, // include .js files
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                loader: "jshint-loader"
            }
        ]
    },
    resolve: {
        alias: {

        }
    },
    plugins: [
        new extractTextPlugin("[name].css")
    ]
};
