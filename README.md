# node-rest
A Node.js RESTful API made from scratch using [express.js](https://expressjs.com/). 

[![Build Status](https://travis-ci.org/travis-ci/travis-web.svg?branch=master)](https://travis-ci.org/travis-ci/travis-web)

## Features
- Secured enpoints using [JSON Web Tokens](https://github.com/auth0/node-jsonwebtoken).
- File/Image uploads using [multer](https://github.com/expressjs/multer).
- User authentication using [JWT](https://github.com/auth0/node-jsonwebtoken) and [bcrypt](https://github.com/kelektiv/node.bcrypt.js).
- Scalable

## Installation
- Clone the repository
    `$ git clone https://github.com/vishnuh655/node-rest.git`
- `$ cd node-rest`
- Install packages
    `$ npm install`
- Generate .env
    `$ npm run setup`
- Edit the .env file to add mongodb URI in the 'MONGODB' field and save.
- Run using
    `$ npm start`

## Folder Structure
```
.
├── api                      # REST API
│   ├── controllers          # Route logic
│   ├── middleware           # Express middlewares
│   ├── models               # Bussiness logic, handles storage
│   └── routes               # Defines routes
|
├── uploads                  # Image store
├── server.js                # Entry point
├── app.js                   # App source
├── .env-default             # .env template
└── setup.js                 # .env generator
```    


