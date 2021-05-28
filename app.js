const express = require('express');
const mongoose = require('mongoose');
const { render } = require('ejs');
require('dotenv').config();

const app = express();
const port = 3000;
app.set('view engine', 'ejs');
express.static(__dirname);
app.use(express.static('public'));

mongoose.connect(process.env.HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/blog', (req, res) => {
  res.render('blogHome');
});

app.get('/create', (req, res) => {
  res.render('create');
});

app.post('/create-blog', (req, res) => {});

app.listen(port, () => {
  console.log('Listening on port 3000');
});
