'use strict';
const path = require('path');
const webpack = require('webpack');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = {
    watch: false,
    context: __dirname + '/',
    entry:  {
        common: './dev/common/js/common.js'
    },
    output:  {
        path: __dirname + '/build',
        publicPath: '/js/',
        filename: '[name].js'
    },

    resolve: {
        extensions: ['', '.js', '.styl'],
        modulesDirectories: [
            'node_modules',
            'bower_components'
        ],
        alias: {
            "jquery": "jquery/dist/jquery.min.js",
            "slick-carousel": "slick-carousel/slick/slick.min.js",
            modules:  __dirname + '/node_modules'
        }
    },
    devtool: isDevelopment ? 'cheap-module-inline-source-map' : null,
    module: {
        preLoaders: [{
            test: /\.js$/,
            loader: "eslint",
            exclude: /node_modules/
        }],
        loaders: [
            {
                test:   /\.js$/,
                exclude: /\/node_modules\//,
                loader: "babel?presets[]=es2015"
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.(jpe?g|png|gif)$/i, loader:"file"
            },
            // { test: /[\/]jquery\.js$/, loader: 'exports?jquery' }

        ],
        // noParse: /\/(node_modules)\/(jquery)/
    },

    plugins: [
        new CommonsChunkPlugin({
            name: "common",
            filename: "common.js"
        }),
        new webpack.ProvidePlugin({
            $: "jquery/dist/jquery.min.js",
            jQuery: "jquery/dist/jquery.min.js",
            "window.jQuery": "jquery/dist/jquery.min.js"
        }),
        new ExtractTextPlugin("../css/vendor.css", {
            allChunks: true
        }),
        new webpack.NoErrorsPlugin()
    ],
    eslint: {
        failOnWarning: false,
        failOnError: true,
        configFile: './.eslintrc.js'
    },
    parserOptions: {
        "ecmaFeatures": {
            "modules": true
        }
    }
};
