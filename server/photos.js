const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../public/images/',
  limits: {
    fileSize: 10000000
  }
});

const users = require("./users.js");
const User = users.model;

const photoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  title: String,
  description: String,
  created: {
    type: Date,
    default: Date.now
  },
  comments: [{
    text: String,
    username: String,
    created: {
      type: Date,
      default: Date.now
    }
  }]
});

const Photo = mongoose.model('Photo', photoSchema);


// upload photo
router.post("/", auth.verifyToken, User.verify, upload.single('photo'), async (req, res) => {
  console.log("IN POST!")
  // check parameters

  const photo = new Photo({
    user: req.user,
    //path: "/images/" + req.file.filename,
    title: req.body.title,
    description: req.body.description,
  });
  try {
    await photo.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get my photos
router.get("/", auth.verifyToken, User.verify, async (req, res) => {
  // return photos
  try {
    let photos = await Photo.find({
      user: req.user
    }).sort({
      created: -1
    });
    return res.send(photos);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get all photos
router.get("/all", async (req, res) => {
  try {
    let photos = await Photo.find().sort({
      created: -1
    }).populate('user');
    return res.send(photos);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get single photo
router.get("/single/:id" , async (req, res) => {
  try {
    let photo = await Photo.find({"_id" : req.params.id}).populate('user');
    return res.send(photo[0]);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post("/comment/:id", async(req, res)=> {
  console.log("In comment post")
  try{
    let photo = await Photo.findOne({
      _id: req.params.id
    });
    console.log(photo);
    photo.comments.push({
      text: req.body.text,
      username: req.body.username,
    });
    await photo.save();
    return res.send(photo);
  } catch(error){
    console.log(error);
    return res.sendStatus(500);
  }
});




module.exports = {
  model: Photo,
  routes: router,
}
