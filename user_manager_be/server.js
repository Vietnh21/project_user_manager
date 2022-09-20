const cors = require("cors");
const express = require("express"),
  app = express(),
  bodyParser = require("body-parser");
var sql = require("./models/db");
port = process.env.PORT || 8000;
app.listen(port);
app.use(cors());

console.log("API server started on: " + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require("./routes/appRoutes");
routes(app);

app.post("/authen", function authen(request, response) {
  let username = request.body.username;
  let password = request.body.password;

  if (username && password) {
    sql.query(
      "SELECT * FROM accounts WHERE username = ? AND password = ?",
      [username, password],
      function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          response.status(200).send("login succes!");
        } else {
          response.status(401).send("Incorrect Username and/or Password!");
        }
        response.end();
      }
    );
  } else {
    response.status(400).send("Please enter Username and Password!");
    response.end();
  }
});
