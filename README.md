# Node.js API

Visit https://a-nodejs-api.herokuapp.com
Routes
- ```/todos

## To deploy on Heroku

### Connect DB online
- Create a "free" new DB on mlab.com
- Add a database user
- Copy the the URI using the database user credentials
- heroku config:set MONGODB_URI="URI"

### Push project on Heroku
- git push heroku master
- visit: https://a-nodejs-api.herokuapp.com/todos

## To test the API via Postman
- POST https://a-nodejs-api.herokuapp.com/todos
```
{
    "Test via postman"
}
```
