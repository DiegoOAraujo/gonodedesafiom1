const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const moment = require('moment');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});
app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('main');
});



app.post('/check', (req, res) => {
  const {nome, dtNasc} = req.body;
  const idade = moment().diff(moment(dtNasc, "DD/MM/YYYY"), 'years');

  if (idade < 18) {
    res.redirect(`minor?nome=${nome}`);
  }else{
    res.redirect(`major?nome=${nome}`);
  }
});
app.get('/major', (req, res) => {
  const {nome} = req.query;
  res.render('major', {nome});
});
app.get('/minor', (req, res) => {
  const {nome} = req.query;
  res.render('minor',{nome});
});

app.listen(3000);
