var express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  path = require("path"),
  moment = require("moment"),
  Event = require("./models/event");

const { ObjectID } = require("mongodb");

mongoose.connect(
  process.env.MONGO_URI || "mongodb://localhost:27017/devfestKolkata",
  {
    useNewUrlParser: true
  }
);

const port = process.env.PORT || 3000;

var app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));

// =========
// ROUTES
// =========

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/response", (req, res) => {
  res.render("dashboard");
});

app.get("/coupons", (req, res) => {
  res.render("addEvent");
});

app.post("/feedback", (req, res) => {
  var email = req.body.email;
  Event.findOne({ email: email })
    .then(event => {
      if (event.active == true) {
        res.redirect("/coupons");
      } else {
        res.redirect("/response");
      }
    })
    .catch(e => {
      var event = new Event({
        email: req.body.email
      });

      event.save().then(
        doc => {
          res.redirect("/response");
        },
        e => {
          res.status(400).send(e);
        }
      );
    });
});

app.post("/feedback/submit", (req, res) => {
  // console.log(req.body);
  Event.findOne({
    email: req.body.email
  }).then(event => {
    event.overallRating = req.body.overallRating;
    event.sessionsAttended = req.body.sessionsAttended;
    event.visitedSBs = req.body.visitedSBs;
    event.buffetRating = req.body.buffetRating;
    event.stageRating = req.body.stageRating;
    event.volunteersRating = req.body.volunteersRating;
    event.eventManagementRating = req.body.eventManagementRating;
    event.beforeEventRating = req.body.beforeEventRating;
    event.upcomingDevfest = req.body.upcomingDevfest;
    event.shortReview = req.body.shortReview;
    event.makingBetter = req.body.makingBetter;
    event.active = true;

    event
      .save()
      .then(() => {
        console.log(event);
        res.redirect("/coupons");
      })
      .catch(err => {
        console.error(err);
        res.status(400).send("Could  not post review");
      });
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
