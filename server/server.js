const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname,'..','public');
const port = process.env.PORT || 3000;

//the backend of our application. 
//A server is a program that serves our application to network requests,
// so when anyone requests our web page, we send them our application in response.
//- every request that comes in, our index.html file gets sent back, 
//which in turn fetches our bundle.js file and bootstraps our React app from there.

//customize the server to serve up the public folder
app.use(express.static(publicPath));

//to make sure that '/create' (and all unmatched routes) works When you directly visit it 
//if what requested isn't in the public folder, give back 'index.html'


app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => { //a 2nd argument to this is a cb, And it gets called when the server is actually up
    console.log('Server is up!'); 
});