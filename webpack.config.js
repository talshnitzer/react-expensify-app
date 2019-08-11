const path = require('path');
//entry -> output

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname,'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader', //load are we trying to use
            test: /\.js$/, //only when files meet that criteria will be run babbel through them.(only.js files)
            exclude: /node_modules/
        }, {
            test:/\.s?css$/, //any file which ends with .css or .scss
            use: [                    //seting more than 1 loader
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname,'public'),
        historyApiFallback: true        //tells the server that we're going to be handling routing via our client side code and that it should return index.html for all 404 routes 
    }
};

//A loader lets you customize the behavior of web pack when it loads a given file.
