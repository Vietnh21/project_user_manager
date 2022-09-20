"use strict";
module.exports = function (app) {
  var userManager = require("../controllers/appController");
  app
    .route("/users")
    .get(userManager.list_all_users)
    .post(userManager.create_a_user);

  app
    .route("/users/:userId")
    .get(userManager.read_a_user)
    .put(userManager.update_a_user)
    .delete(userManager.delete_a_user);
};
