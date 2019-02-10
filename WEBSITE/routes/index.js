var express = require("express");
var router = express.Router();
var User = require("../models/user");
var request = require("request");
var Mailer = require("../services/Mailer");
var emailTemplate = require("../services/emailTemplate");
var mongoose = require("mongoose");

var Email = require("../models/email");

//INDEX - show all campgrounds
router.get("/", function(req, res) {
  // Get all campgrounds from DB
  //   Campground.find({}, function(err, allCampgrounds) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       res.render("campgrounds/index", { campgrounds: allCampgrounds });
  //     }
  //   });
  res.render("main");
});

//CREATE - add new campground to DB
// middleware.isExist,
router.post("/", function(req, res) {
  // get data from form and add to campgrounds array
  var email = req.body.email;
  var location = req.body.location;
  // console.log(email);
  // console.log(location);
  //   var image = req.body.image;
  //   var desc = req.body.description;
  //   var author = {
  //     id: req.user._id,
  //     username: req.user.username
  //   };
  var query = { email: email };
  User.find(query, function(err, foundEmail) {
    if (err) {
      console.log(err);
    } else {
      console.log(foundEmail);
      if (foundEmail.length > 0) {
        console.log("The email is already subscribed!");
        res.redirect("/fail");
      } else {
        var newInfo = {
          email: email,
          location: location
        };
        // Create a new campground and save to DB
        User.create(newInfo, function(err, newlyCreated) {
          if (err) {
            console.log(err);
          } else {
            console.log(newlyCreated);
            res.redirect("/success");
          }
        });
      }
    }
  });

  //   Campground.create(newCampground, function(err, newlyCreated) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       //redirect back to campgrounds page
  //       console.log(newlyCreated);
  //       res.redirect("/campgrounds");
  //     }
  //   });
});

router.get("/success", function(req, res) {
  res.render("success");
});

router.get("/fail", function(req, res) {
  res.render("fail");
});

router.post("/run", async (req, res) => {
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
        await request(
          "https://api.weatherbit.io/v2.0/current?city=" +
            location +
            "&key=fd02396dfb98477382e4be683f60d3d4",
          { json: true },
          async (err, res, body) => {
            if (err) {
              console.log(err);
            } else {
              curr_temp = body.data[0].temp;
              curr_precip = body.data[0].precip;
            }
          }
        );

        await request(
          "https://api.weatherbit.io/v2.0/history/daily?city=" +
            location +
            "&start_date=2019-02-06&end_date=2019-02-07&key=fd02396dfb98477382e4be683f60d3d4",
          { json: true },
          async (err, res, body) => {
            if (err) {
              console.log(err);
            } else {
              his_temp = body.data[0].temp;
              // console.log(body);
              console.log(curr_precip);
              console.log(curr_temp);
              console.log(his_temp);
              // var subject = "Enjoy a discount on us";
              // var body =
              //   curr_temp +
              //   " celcius degrees, " +
              //   (curr_precip == null || curr_precip == 0)
              //     ? "sunny."
              //     : "rainy.";
              // if (
              //   curr_precip == null ||
              //   curr_precip == 0 ||
              //   curr_temp >= 5 + his_temp
              // ) {
              //   subject = "It's nice out! Enjoy a discount on us.";
              // } else if (curr_precip > 0 || curr_temp + 5 <= his_temp) {
              //   subject =
              //     "Not so nice out? That's okay, enjoy a discount on us.";
              // }
              // var title = subject;
              // // 2 api call over
              // // call for email now!
              // var email = new Email({
              //   title: title,
              //   subject: subject,
              //   body: body,
              //   recipients: email,
              //   dateSent: Date.now()
              // });
            }
          }
        );
        var subject = "Enjoy a discount on us";
        var body =
          "You are currently at " +
          location +
          ", and the temperature today is " +
          curr_temp +
          " celcius degrees, " +
          (curr_precip == null || curr_precip == 0 ? "sunny." : "rainy.");
        if (
          curr_precip == null ||
          curr_precip == 0 ||
          curr_temp >= 5 + his_temp
        ) {
          subject = "It's nice out! Enjoy a discount on us.";
        } else if (curr_precip > 0 || curr_temp + 5 <= his_temp) {
          subject = "Not so nice out? That's okay, enjoy a discount on us.";
        }
        var title = subject;
        // 2 api call over
        // call for email now!
        var email = new Email({
          title: title,
          subject: subject,
          body: body,
          recipients: email,
          dateSent: Date.now()
        });

        var mailer = new Mailer(email, emailTemplate(email));
        try {
          await mailer.send();
        } catch (err) {
          console.log(err);
        }
      });
    }
  });
});

// router.post("/run", async (req, res) => {
//   // iterate db
//   // for each elt.request call. get weather
//   // construct.
//   User.find({}, async (err, allUser) => {
//     if (err) {
//       console.log(err);
//     } else {
//       allUser.forEach(async user => {
//         var email = user.email;
//         var location = user.location;
//         if (location == null) {
//           location = "New York City,NY";
//         }
//         if (email == null) {
//           email = "zg242@cornell.edu";
//         }
//         console.log(location);
//         var curr_temp = 0;
//         var curr_precip = 0;
//         var his_temp = 0;
//         await request(
//           "https://api.weatherbit.io/v2.0/current?city=" +
//             location +
//             "&key=fd02396dfb98477382e4be683f60d3d4",
//           { json: true },
//           async (err, res, body) => {
//             if (err) {
//               console.log(err);
//             } else {
//               curr_temp = body.data[0].temp;
//               curr_precip = body.data[0].precip;
//               await request(
//                 "https://api.weatherbit.io/v2.0/history/daily?city=" +
//                   location +
//                   "&start_date=2019-02-06&end_date=2019-02-07&key=fd02396dfb98477382e4be683f60d3d4",
//                 { json: true },
//                 async (err, res, body) => {
//                   if (err) {
//                     console.log(err);
//                   } else {
//                     his_temp = body.data[0].temp;
//                     // console.log(body);
//                     console.log(curr_precip);
//                     console.log(curr_temp);
//                     console.log(his_temp);
//                     var subject = "Enjoy a discount on us";
//                     var body =
//                       curr_temp +
//                       " celcius degrees, " +
//                       (curr_precip == null || curr_precip == 0)
//                         ? "sunny."
//                         : "rainy.";
//                     if (
//                       curr_precip == null ||
//                       curr_precip == 0 ||
//                       curr_temp >= 5 + his_temp
//                     ) {
//                       subject = "It's nice out! Enjoy a discount on us.";
//                     } else if (curr_precip > 0 || curr_temp + 5 <= his_temp) {
//                       subject =
//                         "Not so nice out? That's okay, enjoy a discount on us.";
//                     }
//                     var title = subject;
//                     // 2 api call over
//                     // call for email now!
//                     var email = new Email({
//                       title: title,
//                       subject: subject,
//                       body: body,
//                       recipients: email,
//                       dateSent: Date.now()
//                     });

//                     var mailer = new Mailer(email, emailTemplate(email));

//                     try {
//                       await mailer.send();
//                     } catch (err) {
//                       console.log(err);
//                       // res.status(422).send(err);
//                     }
//                     // mailer.send();
//                     // try {
//                     //   await mailer.send();
//                     //   await email.save();
//                     // } catch (err) {
//                     //   res.status(422).send(err);
//                     // }
//                   }
//                 }
//               );
//             }
//           }
//         );
//       });
//     }
//   });
// });

module.exports = router;
