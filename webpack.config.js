const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

//setup of NODE_ENV: set it equal to itself. or if it doesn't exist set it equal to the string 'development'.
//So it will be string 'production' on Heroku, the string 'test' in the test environment,
//or If it's neither of those, than we know it's development, and we're going to use that value.

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//we're not going to do is put the values in the code
//because than we would be in a situation where we have secret information in our code. 
//and we never want to commit this stuff.
//So what we create separate files one for test and one for development. 
//Those gonna be excluded from the git repository and we're going to read those files in right here:

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config( { path:'.env.test' }); //module that loads environment variables from a .env file into process.env
} else if (process.env.NODE_ENV) {
    require('dotenv').config( { path:'.env.development' });
}

//This is an environment variable that stores the environment you're currently in.
//this gets automatically set on Heroku. Heroku sets this value equal to the string 'production'.
//process.env.NODE_ENV

//entry -> output

//export an object directly from webpackack, or: 
//export a function, and that function when called, returns the web config object.

module.exports = (env) => { //the env arg is defined in build:prod script in package.json by '--env' flag
    const isProduction = env === 'production';
    //extracting css to a seperate file is better for performance as your CSS will be loaded in parallel with your JavaScript bundle. 
    const CSSExtract = new ExtractTextPlugin('styles.css'); //plugin to make webpack save the css compiled files outside of bundle.js, in a file name we pass here as arg

    return {
        entry: ['babel-polyfill','./src/app.js'],//multiple entry points definedin array of strings - this set up Babel polyfill, and then include our app. babel polyfill add supoort for older browsers
        output: {
            path: path.join(__dirname,'public','dist'),
            filename: 'bundle.js'
        },
        // process CSS file or SCSS file, then take that text and 
        //instead of including it inline, dump it into a separate file. (production adition)
        //A loader lets you customize the behavior of web pack when it loads a given file.
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
            CSSExtract,
            new webpack.DefinePlugin({ //we need to pass six values down into our client side javascript
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY), //'variable set in our client side javascript': same_variable_in_the_node_environment
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
                'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID)
            })
        ],
        //A source map provides a way of mapping code within a compressed file back to it’s original position in a source file. 
        //This means that – with the help of a bit of software – you can debug your applications even after your assets have been optimized
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        //Development Server
        devServer: {
            contentBase: path.join(__dirname,'public'),//this is where the static files (index.html) are
            historyApiFallback: true,        //tells the server that we're going to be handling routing via our client side code and that it should return index.html for all 404 routes 
            publicPath: '/dist/'    //this is where the bundle (compiled) files are,
                                    //the path is relative to the root of the web server and not my file system
        }
    };
};



