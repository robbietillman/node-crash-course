const express = require('express');
const morgan = require ('morgan');
const mongoose = require('mongoose')
const Blog = require('./models/blog')

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


app.use(morgan('dev'))

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: "New Blog",
        snippet: "about my new blog",
        body: "more about my new blog"
    })
    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/all-blogs', (req,res) => {
    Blog.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/single-blog', (req, res) => {
    Blog.findById('60ce90db5ddb4f06bc0198ea')
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})


app.use((req, res, next) => {
    console.log('new request made:')
    console.log('host: ', req.hostname)
    console.log('path: ', req.path)
    console.log('method: ', req.method)
    next();
});

app.use((req, res, next) => {
    console.log('in the next middleware')
    next();
});

app.get('/', (req, res) => {
    // have to include root: __dirname to tell function the relative path is in the cwd
    // res.sendFile('./views/index.html', {root:  __dirname})

    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];
    res.render('index', {title: 'Home', blogs})

});

app.get('/about', (req, res) => {
    // res.sendFile('./views/about.html', {root:  __dirname})
    res.render('about', {title: 'About'})
});

// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a new post'})
})


// 404 page - website will know it's 404 bc none of above cases have been fulfilled
// note: this must go at bottom, bc it needs to try every other option first
app.use((req, res) => {
    // res.sendFile('./views/404.html', {root:  __dirname})
    // res.status(404).sendFile('./views/404.html', {root:  __dirname})
    res.status(404).render('404', {title: '404'})
})