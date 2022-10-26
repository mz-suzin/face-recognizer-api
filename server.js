const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

// import express from 'express';
// import bcrypt from 'bcrypt-nodejs';
// import cors from 'cors';
// import knex from 'knex';

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

// import register from './controllers/register.js';
// import profile from './controllers/profile.js';
// import signin from './controllers/signin.js';
// import image from './controllers/image.js';

const app = express();

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'test',
      database : 'smart-brain'
    }
  });

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send(db.users) })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
//the :id here means that anything that the get request finds in the position of the :id will be treated as a parameter named "id"
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res)})

app.listen(3000, () => {
    console.log('app is running on port 3000');
});

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

//instead of this:
// app.use(bodyparser.urlencoded({extended: false}));
// app.use(bodyparser.json());

//use this:
// app.use(express.urlencoded({extended: false}));
// app.use(express.json());

// So what we intend to do is something around these lines:
// on SIGN IN page --> POST for success or failure of login
// on REGISTER --> POST with user credentials
// on HOME --> GET for userId to keep track of user score
// also HOME --> PUT whenever the user adds a new face to be recognised, keeping track of user score

