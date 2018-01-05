/**
 * HIGH LEVEL PURPOSE
 * -connect mongoose to mongodb
 * -interacts with mongoDB DB
 * -define schema 
 * -define model 
 * -save documents to MongoDB DB
 */

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We\'re in business!')
});

var profileSchema = mongoose.Schema({
    id: Number,
    name: String,
    imageURL: String,
    //first start /w single hints; change to array later!
    hint1: String,
    hint2: String,
    hint3: String,
    hint4: String
});

//profile is constructor function 
var Profile = mongoose.model('Profile', profileSchema);

// var testProfile = new Profile({
//     id: 1,
//     name: "panda",
//     imageURL: "https://i.pinimg.com/736x/86/55/0d/86550d67399c902bafeebc4495c255ef--baby-panda-bears-panda-babies.jpg",
//     hint1: "cute & cuddly",
//     hint2: "like to eat bamboo",
//     hint3: "originally from China",
//     hint4: "c'mon you know what this is!"
// });

//Profile.find (model)

//instance.save (instance)
  //errorback format: (err, instance)

// testProfile.save((err, testProfile) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(testProfile);
//     }
// });

//assume save only ONE Profile
  //pass callback to avoid save async issue
const saveProfile = (profile, callback) => {
  
//create new instance of model using object passed into save Profile (object provided by client)
  //profile is req.body (an object)
let newProfile = new Profile(profile);

    newProfile.save((err, profile) => {
        if (err) {
            console.log(err);
        } else {
            callback(null, profile);
        }
    })
}

const fetchProfiles = (callback) => {
    //in index.js (database), can call find directly on Model 
    Profile.find().exec((err, results) => {
        if (err) {
            callback(err);
        } else {
            callback(null, results);
        }
    })
}
//CLEAR DB CODE
// Profile.find().remove().exec()

module.exports = {
    saveProfile,
    fetchProfiles
}