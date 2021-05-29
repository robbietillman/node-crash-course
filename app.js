const express = require('express');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs')

// listen for requests
app.listen(3000);

app.get('/', (req, res) => {
    // have to include root: __dirname to tell function the relative path is in the cwd
    res.render('./views/index.html', {root:  __dirname})
});

app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', {root:  __dirname})
});

// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about')
})




// 404 page - website will know it's 404 bc none of above cases have been fulfilled
// note: this must go at bottom, bc it needs to try every other option first
app.use((req, res) => {
    // res.sendFile('./views/404.html', {root:  __dirname})
    res.status(404).sendFile('./views/404.html', {root:  __dirname})
})