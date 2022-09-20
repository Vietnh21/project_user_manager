"use strict";

var User = require("../models/appModel.js");

exports.list_all_users = function (req, res) {
  User.getAllUser(function (err, user) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", user);
    res.send(user);
  });
};

exports.create_a_user = function (req, res) {
  var new_user = new User(req.body);
  if (!new_user.name) {
    res.status(400).send({ error: true, message: "Please provide user" });
  } else {
    User.createUser(new_user, function (err, user) {
      if (err) res.send(err);
      res.json(user);
    });
  }
};

exports.read_a_user = function (req, res) {
  User.getUserById(req.params.userId, function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.update_a_user = function (req, res) {
  User.updateUserById(
    req.params.userId,
    new User(req.body),
    function (err, user) {
      if (err) res.send(err);
      res.json(user);
    }
  );
};

exports.delete_a_user = function (req, res) {
  User.remove(req.params.userId, function (err, user) {
    if (err) res.send(err);
    res.json({ message: "User successfully deleted" });
  });
};
