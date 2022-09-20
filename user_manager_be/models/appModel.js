"user strict";
var sql = require("./db.js");

var User = function (user) {
  this.name = user.name;
  this.age = user.age;
  this.address = user.address;
};

User.createUser = function createUser(newUser, result) {
  sql.query("INSERT INTO users set ?", newUser, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

User.getUserById = function createUser(userId, result) {
  sql.query("Select * from users where id = ? ", userId, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

User.getAllUser = function getAllUser(result) {
  sql.query("Select * from users", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("users : ", res);
      result(null, res);
    }
  });
};

User.updateUserById = function (id, user, result) {
  sql.query(
    "UPDATE users SET name = ?, age = ?, address = ?  WHERE id = ?",
    [user.name, user.age, user.address, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

User.remove = function (id, result) {
  sql.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = User;
