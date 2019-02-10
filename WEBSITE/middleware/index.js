var User = require("../models/user");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.isExist = function(req, res, next) {
  console.log(req.params);
  console.log(req.params.email);
  var query = { email: req.params.email };
  User.find(query, function(err, foundEmail) {
    if (err) {
      console.log(err);
    } else {
      console.log(query);
      console.log(foundEmail);
      if (query != null) {
        console.log("The email is already subscribed!");
        res.redirect("back");
      } else {
        next();
      }
    }
  });
};

module.exports = middlewareObj;
