require('./server/config/config');

// Library imports
const bodyParser = require('body-parser');
const express = require('express');
const _ = require('lodash');
const path = require('path');
const { ObjectID } = require('mongodb');
const PORT = process.env.PORT || 5000;

// Local imports
const { mongoose } = require('./server/mongoose/mongoose');
const { Todo } = require('./server/models/todo');
const { User } = require('./server/models/user');
const { authenticate } = require('./server/middleware/authenticate');

const app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'));

app.use(bodyParser.json());

/* --- --- TODO --- --- */

// POST
app.post('/todos', (req, res) => {
  const todo = new Todo({
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
    const id = req.params.id;
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
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Id not valid');
    }
    Todo.findOneAndDelete({_id: id}).then((todo) => {
        if (!todo) {
            return res.status(404).send('Id not found');
        }
        res.status(200).send({todo})
    }).catch((error) => {
        res.status(400).send(error);
    });
});

// UPDATE BY ID
app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['text', 'completed']);
  
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
    if (_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
    } else {
      body.completed = false;
      body.completedAt = null;
    }
  
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({todo});
    }).catch((e) => {
      res.status(400).send();
    })
  });

/* --- --- USER --- --- */

// POST
app.post('/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

// GET MYSELF
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

module.exports = { app };
