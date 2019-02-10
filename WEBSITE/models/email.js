var mongoose = require("mongoose");
// var { Schema } = mongoose;

var emailSchema = mongoose.Schema({
  title: String,
  subject: String,
  body: String,
  recipients: String,
  dateSent: Date
});

// mongoose.model("emails", emailSchema);
module.exports = mongoose.model("Email", emailSchema);
