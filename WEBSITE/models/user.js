var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  email: String,
  location: String
});

module.exports = mongoose.model("User", userSchema);
