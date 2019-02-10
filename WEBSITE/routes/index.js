var express = require("express");
var router = express.Router();
var User = require("../models/user");
var request = require("request");
var Mailer = require("../services/Mailer");
var emailTemplate = require("../services/emailTemplate");
var keys = require("../config/keys");

var Email = require("../models/email");
var emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

//INDEX - main page where there is a form.
router.get("/", function(req, res) {
  res.render("main");
});

//CREATE - add new User info into MONGODB
router.post("/", function(req, res) {
  // get data from form
  var email = req.body.email;
  var location = req.body.location;

  // make a query to see if this is already exist.
  var query = { email: email };
  User.find(query, function(err, foundEmail) {
    if (err) {
      console.log(err);
    } else {
      console.log(foundEmail);
      if (foundEmail.length > 0) {
        console.log("The email is already subscribed!");
        res.redirect("/fail");

        // check email validation here.
      } else if (emailRegexp.test(email)) {
        var newInfo = {
          email: email,
          location: location
        };

        // Create a new User info and save to DB
        User.create(newInfo, function(err, newlyCreated) {
          if (err) {
            console.log(err);
          } else {
            console.log(newlyCreated);
            res.redirect("/success");
          }
        });
      } else {
        res.redirect("/fail");
      }
    }
  });
});

// subscribe successfuly
router.get("/success", function(req, res) {
  res.render("success");
});

// subsribe in failure, either non-valid email or already subscribed!
router.get("/fail", function(req, res) {
  res.render("fail");
});

// try to send to all subscribers
router.post("/run", async (req, res) => {
  // iterate all elements in DB
  User.find({}, async (err, allUser) => {
    if (err) {
      console.log(err);
    } else {
      allUser.forEach(async user => {
        var email = user.email;
        var location = user.location;
        if (location == null) {
          location = "New York City,NY";
        }
        if (email == null) {
          email = "zg242@cornell.edu";
        }
        console.log(location);
        var curr_temp = 0;
        var curr_precip = 0;
        var his_temp = 0;

        // call the first API
        request(
          "https://api.weatherbit.io/v2.0/current?city=" +
            location +
            "&key=" +
            keys.weatherKey,
          { json: true },
          async (err, res, body) => {
            if (err) {
              console.log(err);
            } else {
              console.log(body);
              curr_temp = body.data[0].temp;
              curr_precip = body.data[0].precip;
              console.log(curr_temp);
              console.log(curr_precip);
              console.log("caonima");

              // call the second API
              request(
                "https://api.weatherbit.io/v2.0/history/energy?city=" +
                  location +
                  "&start_date=2019-02-03&end_date=2019-02-07&key=" +
                  keys.weatherKey,
                { json: true },
                async (err, res, body) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(body);
                    var data = body.data;
                    var sum = 0;
                    data.forEach(today => {
                      sum += today.temp;
                    });
                    his_temp = sum;
                    console.log(curr_precip);
                    console.log(curr_temp);
                    console.log(his_temp);

                    //------
                    // create an email based on the response from the weather API
                    var subject = "Enjoy a discount on us";
                    var body =
                      "You are currently at " +
                      location +
                      ", and the temperature today is " +
                      curr_temp +
                      " degrees, " +
                      (curr_precip == null || curr_precip == 0
                        ? "sunny."
                        : "rainy.");
                    if (
                      curr_precip == null ||
                      curr_precip == 0 ||
                      curr_temp >= 5 + his_temp
                    ) {
                      subject = "It's nice out! Enjoy a discount on us.";
                    } else if (curr_precip > 0 || curr_temp + 5 <= his_temp) {
                      subject =
                        "Not so nice out? That's okay, enjoy a discount on us.";
                    }
                    var title = subject;
                    var email_real = new Email({
                      title: title,
                      subject: subject,
                      body: body,
                      recipients: email,
                      dateSent: Date.now()
                    });

                    var mailer = new Mailer(
                      email_real,
                      emailTemplate(email_real)
                    );
                    mailer.send();
                  }
                }
              );
            }
          }
        );
      });
    }
  });
  res.redirect("/");
});

module.exports = router;
