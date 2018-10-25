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
- *NB: It can take up to 1 minute for the server to charge*

### Todos routes
- GET https://a-nodejs-api.herokuapp.com/todos
- GET https://a-nodejs-api.herokuapp.com/todos:id
- POST https://a-nodejs-api.herokuapp.com/todos
```
{
    "text": "Test via postman"
}
```
- DELETE https://a-nodejs-api.herokuapp.com/todos:id
- UPDATE https://a-nodejs-api.herokuapp.com/todos:id
```
{
	"text": "New test"
}
```

### Users routes
- GET https://a-nodejs-api.herokuapp.com/users/me
-> *passing x-auth/token in headers request found in POST headers response*
- POST https://a-nodejs-api.herokuapp.com/users
```
{
	"email": "email@test.com",
	"password": "pass123!"
}
```

## To test on local machine
- Install MongoDB et create a mongo-data folder next to it
- ```./mongod --dbpath ~/.../mongo-data``` in mongo/bin root folder
- ```npm run testWatch``` to run units tests
- ```npm start``` to run server
- Use Robomongo to check data
