const cssMinifyPlugin = require('optimize-css-assets-webpack-plugin')
const jsMinifyPlugin = require('uglifyjs-webpack-plugin')
const cssPlugin = require('mini-css-extract-plugin')
const cleanPlugin = require('clean-webpack-plugin')
const htmlPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = (env = {}, { mode, ...argv }) => {
    const is = (first, second) => first === second
    const isDev = is('development', mode)
    const isProd = is('production', mode)
    const getOutFilePath = (name = 'bundle') => ({
        css: `css/${name}.css`,
        js: `js/${name}.js`
    })
    const resolvePath = (folder = 'template') => ({
        self: path.resolve(__dirname, folder),
        dist: path.resolve(__dirname, `${folder}/dist`)
    })

    const stats = {
        modules: false,
        entrypoints: false,
        warnings: false
    }

    const overlay = {
        warnings: true,
        errors: true }

    const devServer = {
        historyApiFallback: true,
        compress: true,
        port: 3000,
        overlay,
        stats,
    }

    const optimization = {
        minimizer: [
            new jsMinifyPlugin({}),
            new cssMinifyPlugin({})
        ]
    }

    const plugins = [
        new cleanPlugin(),
        new webpack.DefinePlugin({
            DEV: isDev,
            PROD: isProd,
            ENV: env
        })
    ]

    // Combined Rules
    const htmlRule = {
        test: /\.html$/,
        use: 'html-loader'
    }

    const styleRule = {
        test: /\.(css)$/,
        use: [
            {
                loader: cssPlugin.loader,
                options: {
                    sourceMap: true,
                }
            },
            {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                }
            },
        ]
    }

    const imageRule = {
        test: /\.(jpe?g|png|gif)$/i,
        use: {
            loader: 'file-loader',
            options: { name: '[name].[ext]', outputPath: 'img/' }
        }
    }

    const fontRule = {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        exclude: /img/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                }
            },
        ]
    }

    const javascriptRule = {
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
    }

    // Rules for each subprojects
    const rules = [
        javascriptRule,
        styleRule
    ]

    const resolve = {
        extensions: ['.js', '.jsx', '.css'],
        alias: {
            common: path.resolve(__dirname, 'common')
        }
    }

    return [
        {
            name: 'template',
            mode,
            stats,
            entry: { main: './src/index.js' },
            context: resolvePath('template').self,
            output: {
                path: resolvePath('template').dist,
                publicPath: '/',
                filename: getOutFilePath().js
            },
            devServer: {
				...devServer,
				contentBase: './dist'
			},
            plugins: [
                ...plugins,
                new cssPlugin({ filename: getOutFilePath('styles').css }),
                new htmlPlugin({ template: 'src/index.html' }),
            ],
            resolve ,
            optimization,
            module: {
				rules: [
                    ...rules,
				]
			},
            devtool: isDev ? 'inline-source-map' : 'none'
        }
    ]
}
