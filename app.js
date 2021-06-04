const express = require('express');
const mongoose = require('mongoose');
const { render } = require('ejs');
const bodyParser = require('body-parser');

require('dotenv').config();

let Blog = require('./models/blogSchema');
const blogSchema = require('./models/blogSchema');

const app = express();
const port = 3000;
app.set('view engine', 'ejs');
express.static(__dirname);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let connection = mongoose.connection;

app.get('/', (req, res) => {
  blogSchema.find((err, data) => {
    if (data) {
      // jsonData = JSON.stringify(data);
      res.render('index', { data: data });
      console.log(data);
    } else {
      console.log(err);
    }
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/blog', (req, res) => {
  res.render('blogHome');
});

app.get('/shop', (req, res) => {
  res.render('shop');
});

app.post('/blogs', (req, res) => {
  console.log(req.body);
  let blogData = {
    title: req.body.title,
    snippet: req.body.snippet,
    body: req.body.body
  };
  new Blog(blogData).save();
  res.redirect('/create');
});

app.get('/create', (req, res) => {
  res.render('create');
});

app.listen(port, () => {
  console.log('Listening on port 3000');
});
