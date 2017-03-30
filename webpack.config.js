const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        'whatwg-fetch',
        './src/app.ts'
    ],
    output: {
        path: require("path").resolve("./dst/js/"), filename: 'main.js'
    },
    devtool: "cheap-module-eval-source-map",
    resolve: {
        extensions: ['.ts', '.vue', '.js'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    // presets: ['es2015', { modules: false }]
                    presets: ['es2015']
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules|vue\/src/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/]
                        }
                    },
                    {
                        loader: 'tslint-loader',
                        options: {
                            enforce: 'pre'
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    esModule: true,
                }
            },
        ]
    }
};

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = "#source-map";
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        })
    ])
}
