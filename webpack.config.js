const path = require('path')
const { CleanWebpackPlugin } = require('çlean-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/main/index.js',
    output: {
        path: path.join(__dirname, 'public/js'),
        publicPath: '/public/js',
        fileName: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts','.tsx','.js'],
        alias: {
            '@': path.join(__dirname, 'src')
        }
    },
    devServer: {
        contentBase: './public',
        writeToDisk: true,
        historyApiFallback: true
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM'
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
}