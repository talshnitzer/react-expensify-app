const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//entry -> output

//export an object directly from webpackack, or: 
//export a function, and that function when called, returns the web config object.

module.exports = (env) => { //the env arg is defined in build:prod script in package.json by '--env' flag
    const isProduction = env === 'production';
    //extracting css to a seperate file is better for performance as your CSS will be loaded in parallel with your JavaScript bundle. 
    const CSSExtract = new ExtractTextPlugin('styles.css'); //plugin to make webpack save the css compiled files outside of bundle.js, in a file name we pass here as arg

    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname,'public'),
            filename: 'bundle.js'
        },
        // process CSS file or SCSS file, then take that text and 
        //instead of including it inline, dump it into a separate file. (production adition)
        module: {
            rules: [{
                loader: 'babel-loader', //load are we trying to use
                test: /\.js$/, //only when files meet that criteria will be run babbel through them.(only.js files)
                exclude: /node_modules/
            }, {
                test:/\.s?css$/, //any file which ends with .css or .scss
                use: CSSExtract.extract({
                    use: [
                        {
                            loader:'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap:true
                            }
                        }
                    ]
                })
            }]
        },
        plugins: [
            CSSExtract
        ],
        //A source map provides a way of mapping code within a compressed file back to it’s original position in a source file. 
        //This means that – with the help of a bit of software – you can debug your applications even after your assets have been optimized
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname,'public'),
            historyApiFallback: true        //tells the server that we're going to be handling routing via our client side code and that it should return index.html for all 404 routes 
        }
    };
};


//A loader lets you customize the behavior of web pack when it loads a given file.
