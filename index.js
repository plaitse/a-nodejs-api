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
  .get('/', (req, res) => res.render('pages/index'));

app.use(bodyParser.json());

// POST
app.post('/todos', (req, res) => {
  let todo = new Todo({
      text: req.body.text
  });
  todo.save().then((doc) => {
      res.status(200).send(doc);
  }, (error) => {
      res.status(400).send(error);
  });
});

// GET ALL
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
      res.status(200).send({todos});
  }, (error) => {
      res.send(400).send(error);
  });
});

// GET BY ID
app.get('/todos/:id', (req, res) => {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
      return res.status(404).send('Id not valid');
  }
  Todo.findById(id).then((todo) => {
      if (!todo) {
          return res.status(404).send('Id not found');
      }
      res.status(200).send({todo})
  }).catch((error) => {
      res.status(400).send(error);
  });
});

// DELETE BY ID
app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Id not valid');
    }
    Todo.findByOneAndRemove({_id: id}).then((todo) => {
        if (!todo) {
            return res.status(404).send('Id not found');
        }
        res.status(200).send({todo})
    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

module.exports = { app };
