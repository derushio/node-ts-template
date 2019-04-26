const dotenv = require('dotenv');

/**
 * 環境設定
 * .envが共通ファイル、.env.localが個人用ファイル
 */
const env = Object.assign({},
    dotenv.config({ path: '.env' }).parsed || {},
    dotenv.config({ path: '.env.local' }).parsed || {});

/**
 * ビルド環境
 */
env.NODE_ENV = (env.NODE_ENV === 'production')
    ? env.NODE_ENV
    : process.env.NODE_ENV;
console.log('NODE_ENV:', env.NODE_ENV);

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

/**
 * Path / File
 */
const contextPath = path.resolve(__dirname, './');
const distPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');

/**
 * 製品環境判定
 */
const isProduct = env.NODE_ENV == 'production';

/**
 * Webpack Config
 */
module.exports = {
    target: 'node',
    mode: env.NODE_ENV,

    context: contextPath,
    entry: {
        main: path.resolve(srcPath, 'main.ts'),
    },
    externals: [ nodeExternals() ],

    output: {
        path: distPath,
        filename: '[name].bundle.js',
        publicPath: './',
    },

    resolve: {
        extensions: [ '.js', '.ts', '.json' ],
        alias: {
            '@': path.resolve(srcPath),
        },
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [ 'ts-loader', 'tslint-loader' ],
            },
        ],
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `"${env.NODE_ENV}"`,
            },
        }),
    ],

    devtool: isProduct? false: '#source-map',
};
