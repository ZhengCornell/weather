var mongoose = require("mongoose");

var emailSchema = mongoose.Schema({
  title: String,
  subject: String,
  body: String,
  recipients: String,
  dateSent: Date
});

module.exports = mongoose.model("Email", emailSchema);
