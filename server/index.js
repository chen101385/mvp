const express = require('express')
const app = express();
var bodyParser = require('body-parser')
var path = require('path');
var fs = require('fs');
var database = require('../database');

// [OPTIONAL] '/' route is the default/root (i.e. index.html)
  //app.use or app.get/post -->  always include a ROUTE!
app.use(express.static(path.join(__dirname, '../src/dist')));

//defaults @ type: application/json
  //automatically parses req.body
  //sends data all-at-once; no more listening for data/chunk
app.use(bodyParser.json());


//"profiles" route is for retrieving all profiles from database
app.get('/profiles', (req, res, next) => {
    if (!req.body) {
        console.log('no request body!')
    } else {
    //get profiles from database
    database.fetchProfiles((err, results) => {
        if (err) {
            console.log('fetch failed, error:', err)
        } else {
            console.log('here are the results', results)
            res.status(200).json(results);
        }
    })
    } 
})


//"profile" route is for posting a single profile to the database;
app.post('/profile', (req, res, next) => {
    if (!req.body) {
        console.log('no request body!')
    } else {
        console.log('/profile req.body:', req.body)
      database.saveProfile(req.body, (err, results) => {
          if (err) {
              console.log('profile post failed! error:', err)
          } else {
              res.sendStatus(201).end();
          }
      })
    } 
})

app.listen(3000, () => console.log('app listening on port 3000!'))
