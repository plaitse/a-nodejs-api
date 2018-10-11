// Library imports
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const { ObjectID } = require('mongodb');
const PORT = process.env.PORT || 5000;

// Local imports
const { mongoose } = require('./server/mongoose/mongoose');
const { Todo } = require('./server/models/todo');
const { User } = require('./server/models/user');

const app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
