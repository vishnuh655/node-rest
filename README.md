# node-rest
A Node.js RESTful API made from scratch using [express.js](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/). 

[![GitHub license](https://img.shields.io/github/license/vishnuh655/node-rest.svg)](https://github.com/vishnuh655/node-rest/blob/master/LICENSE)

[![GitHub issues](https://img.shields.io/github/issues/vishnuh655/node-rest.svg)](https://github.com/vishnuh655/node-rest/issues)

[![GitHub stars](https://img.shields.io/github/stars/vishnuh655/node-rest.svg)](https://github.com/vishnuh655/node-rest/stargazers)

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
- Use [cURL](https://curl.haxx.se/) or [Postman](https://www.getpostman.com/) for testing the API.

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

## API
[Documentaion](https://github.com/vishnuh655/node-rest)

## License
MIT License

Copyright (c) 2018 Vishnu Haridas

