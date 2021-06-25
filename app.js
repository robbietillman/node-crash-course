const express = require('express');
const morgan = require ('morgan');
const mongoose = require('mongoose')
const { response } = require('express');
const { render } = require('ejs');
const { result } = require('lodash');
const blogRoutes = require('./routes/blogRoutes')

// express app
const app = express();

// connect to MongoDB
const dbURI = 'mongodb+srv://userZero:robertodinero23@nodetutorial.6mcmh.mongodb.net/node-tutorial?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs')

// middleware and static files
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

// routes
app.get('/', (req, res) => {
    // have to include root: __dirname to tell function the relative path is in the cwd
    // res.sendFile('./views/index.html', {root:  __dirname})

    res.redirect('/blogs')
});

app.get('/about', (req, res) => {
    // res.sendFile('./views/about.html', {root:  __dirname})
    res.render('about', {title: 'About'})
});

// Blog routes
app.use('/blogs', blogRoutes)

// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about')
})


// 404 page - website will know it's 404 bc none of above cases have been fulfilled
// note: this must go at bottom, bc it needs to try every other option first
app.use((req, res) => {
    // res.sendFile('./views/404.html', {root:  __dirname})
    // res.status(404).sendFile('./views/404.html', {root:  __dirname})
    res.status(404).render('404', {title: '404'})
})