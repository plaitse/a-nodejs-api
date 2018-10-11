# Node.js API

## To deploy on Heroku

### Step to connect DB online
- Create a "free" new DB on mlab.com
- Add a database user
- Copy the the URI using the database user credentials
- heroku config:set MONGODB_URI="URI"