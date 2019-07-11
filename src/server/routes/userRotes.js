const express = require('express');
const UserRouter = express.Router();
const User = require('../models/User');

UserRouter.route('/add').post(function (req, res) {
  const user = new User(req.body);
    user.save()
        .then(user => {
          res.json('ok');
        })
        .catch(err => {
          res.json('error');
        });   
});

UserRouter.route('/').get(function (req, res) {
  User.find(function (err, users){
    if(err){
      res.json('error');
    }
    else {
      res.json(users); 
    }
  });  
});

UserRouter.route('/login').post(function (req, res) {
  const login = req.body.login;
  const password = req.body.password;
  User.findOne({login: login, password: password}).exec(function(err, user) {
    if (err) throw err;
      res.json(user);    
    });
});

UserRouter.route('/edit').post(function (req, res) {
  const login = req.body.login;
  const password = req.body.password;
  User.findOne({login: login, password: password}).exec(function(err, user) {
    if (err) throw err;
      user.score = req.body.score;
      user.toys = req.body.toys;
      user.level = req.body.level;
      user.save().then(user => {
        res.json('ok');
      })   
    });
});
 


module.exports = UserRouter;
