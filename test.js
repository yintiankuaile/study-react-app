let webpack = require('webpack');

let CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
let ManifestPlugin = require('webpack-manifest-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let Clean = require('clean-webpack-plugin');
let fs = require('fs');
let path = require('path');
let extend = require('extend');

let dirname = process.cwd();
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let extractCSS = new ExtractTextPlugin('css/[name].[hash].css');
let glob = require('glob');
let pkg = require('../package.json');
let StringReplacePlugin = require('string-replace-webpack-plugin');
let precss = require('precss');
let autoprefixer = require('autoprefixer');
let WebpackChunkHash = require('webpack-chunk-hash');
let InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')

// 使用缓存
let CACHE_PATH = dirname + '/cache';

module.exports = function getConfig(opt) {
    var isHash = opt.isHash || false,
        jsFilename = 'js/index' + (isHash ? '.[chunkhash:8]' : '') + '.v2.js',
        cssFilename = 'css/[name]' + (isHash ? '.[contenthash:8]' : '') + '.css',
        imgFilename = 'images/[name]' + (isHash ? '.[hash:8]' : '') + '.[ext]';
    commonjsFilename = 'js/common' + (isHash ? '.[chunkhash:8]' : '') + '.v2.js',
        commonchunkjsFilename = 'js/[name]' + (isHash ? '.[chunkhash:8]' : '') + '.v2.js',
        publicPath = opt.publicPath || '//www.guazi-corp.com/projctname',
        outPath = opt.outPath,
        cleanPath = opt.clean;

    return {
        entry: {
            common: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'redux-thunk', 'moment'],
            index: ['babel-polyfill', './src/page/index.js'],
        },
        output: {
            path: path.resolve(dirname, outPath),
            publicPath: publicPath,
            filename: jsFilename,
            chunkFilename: '[id].js',
            sourceMapFilename: '[file].map',
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    include: path.resolve('./src'),
                    // 这里使用 loaders ，因为后面还需要添加 loader
                    loaders: ['babel-loader?cacheDirectory=' + CACHE_PATH],
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'postcss-loader'],
                    }),
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'sass-loader'],
                    }),
                },
                {
                    test: /\.less$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            {
                                loader: 'less-loader',
                                options: {
                                    sourceMap: true,
                                    modifyVars: pkg.theme,
                                },
                            },
                        ],
                    }),
                },

                {
                    test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
                    loader: 'file-loader',
                    query: {
                        name: imgFilename,
                    },
                },
                {
                    test: /api.js$/,
                    loader: StringReplacePlugin.replace({
                        replacements: [
                            {
                                pattern: /<!-- @env -->/ig,
                                replacement: function (match, p1, offset, string) {
                                    return process.env.NODE_ENV;
                                },
                            },
                        ],
                    }),
                },
            ],
        },
        plugins: [
            new Clean([cleanPath], {
                'root': dirname,
            }),
            new HtmlWebpackPlugin({
                template: './src/page/index.html',
                minify: {
                    collapseWhitespace: true,
                    collapseInlineTagWhitespace: true,
                    removeRedundantAttributes: true,
                    removeEmptyAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    removeComments: true,
                },
            }),
            new HtmlWebpackPlugin({
                template: './img.html',
                filename: 'img.html',
                inject: false,
                minify: {
                    collapseWhitespace: true,
                    collapseInlineTagWhitespace: true,
                    removeRedundantAttributes: true,
                    removeEmptyAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    removeComments: true,
                },
            }),
            new CommonsChunkPlugin({
                name: ['common', 'manifest'],
                filename: commonchunkjsFilename,
                minChunks: Infinity,
            }),
            new ExtractTextPlugin(cssFilename),
            new StringReplacePlugin(),
            new webpack.HashedModuleIdsPlugin(),
            new WebpackChunkHash(),
            new InlineManifestWebpackPlugin({
                name: 'webpackManifest',
            }),
            precss,
            autoprefixer,
            new FixChunkIdPlugin(),
        ],
    };
}

/**
 * 固定chunk的ID为文件名
 */
function FixChunkIdPlugin() {

}
FixChunkIdPlugin.prototype.apply = function (compiler) {
    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('before-chunk-ids', function (chunks) {
            chunks.forEach(function (chunk) {
                if (chunk.id === null) {
                    chunk.id = chunk.name;
                }
                if (!chunk.ids) {
                    chunk.ids = [chunk.id];
                }
            });
        });
    });

}