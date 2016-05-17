var path = require("path");
var webpack = require("webpack");
var extractTextPlugin = require("extract-text-webpack-plugin");
var precss = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
    context: __dirname + "/src",
    cache: true,
    entry: {
        index: './index'
    },
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/",
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
                test: /\.less$/,
                loader: extractTextPlugin.extract('css!postcss!less?{"modifyVars":{"THEME":"\'beetbee\'"}}')
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
        root: [
            path.resolve('./src')
        ]
    },
    plugins: [
        new extractTextPlugin("[name].css"),
        new webpack.optimize.UglifyJsPlugin()
    ]
};
