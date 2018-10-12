# Node.js API

Visit https://a-nodejs-api.herokuapp.com

Routes:
- ```/todos```

## To deploy on Heroku

### Connect DB online
- Create a "free" new DB on https://mlab.com
- Add a database user
- Copy the the URI using the database user credentials
- ```heroku config:set MONGODB_URI="URI"```

### Push project on Heroku
- ```git push heroku master```

## To test the API via Postman
- GET https://a-nodejs-api.herokuapp.com/todos
- GET https://a-nodejs-api.herokuapp.com/todos:id
- POST https://a-nodejs-api.herokuapp.com/todos
```
{
    "Test via postman"
}
```
- DELETE https://a-nodejs-api.herokuapp.com/todos:id
- *NB: It can take up to 1 minute for the server to charge*

## To test on local machine
- ```./mongod --dbpath ~/Desktop/Back-End/mongo-data``` in mongo/bin root folder
- ```npm run testWatch``` to run units tests
- ```npm start``` to run server
- Use Robomongo to check data
