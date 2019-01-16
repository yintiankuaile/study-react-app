// 用于拼接路径
var path = require('path');

module.exports = {
    // 指定项目入口
    entry: path.resolve(__dirname, 'index.jsx'),

    // 对输出结果描述
    output: {
        // 输出路径
        path: path.resolve(__dirname, 'build'),
        // 输出的文件名
        filename: 'bundle.js'
    },

    // 配置模块使用的加载器
    module: {
        loaders: [
            { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel' },
            { test: /\.less$/, exclude: /node_modules/, loader: 'style!css!postcss!less' },
            { test: /\.css$/, exclude: /node_modules/, loader: 'style!css!postcss' },
            { test: /\.(png|gif|jpg|jpeg|bmp)$/i, loader: 'url-loader?limit=5000' }, // 限制大小5kb
            { test: /\.(png|woff|woff2|svg|ttf|eot)($|\?)/i, loader: 'url-loader?limit=5000' } // 限制大小小于5k
        ]
    },
    plugins: [
        new webpack.default.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "window.jQuery":"jquery"
        }),
    ]
}