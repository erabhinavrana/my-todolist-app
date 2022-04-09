const express = require("express");
const bodyParser = require("body-parser");
const dateUtility = require(__dirname+"/dateutilities.js");
const mongoose = require("mongoose");
const _ = require("lodash");

// create app constant using express
const app = express();

// set view engine to ejs
app.set("view engine", "ejs");

// set bodyParser to be used for request mapping/parsing
app.use(bodyParser.urlencoded({extended: true}));

// set public folder to render static content
app.use(express.static("public"))

// Create connection with mongodb
 mongoose.connect("mongodb://localhost:27017/todolistDB");
//mongoose.connect("mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.7hipj.mongodb.net/todolistDB");
// create schema in mongodb
const itemsSchema = {
  title: String,
  name: {
    type: String,
    require: [true, "Item Name is required!"]
  }
};

// create model based on itemsSchema
const Item = mongoose.model("Item", itemsSchema);

app.get("/", (req, res) => {
  Item.find({title: "Home"}, (err, items) => {
    if (err) {
      console.log(err);
    } else {
      res.render("list", {title: "Home", kindOfDay: dateUtility.getCurrentDay(), todos: items});
    }
  });
});

app.get("/:title", (req,res) => {
  Item.find({title: _.capitalize(req.params.title)}, (err, items) => {
    if (err) {
      console.log(err);
    } else {
      res.render("list", {title: _.capitalize(req.params.title), kindOfDay: dateUtility.getCurrentDay(), todos: items});
    }
  });
});

app.get("/aboutus", (req, res) => {
  res.render("aboutus");
});

app.post("/", (req, res) => {
  console.log("Todo Item: "+req.body.todoItem+" added successfully in the "+req.body.button+" list!");
  Item.create({
    title: _.capitalize(req.body.button),
    name: req.body.todoItem
  });
    res.redirect("/"+_.capitalize(req.body.button));
});

app.post("/delete", (req, res) => {
  Item.findByIdAndDelete(req.body.itemCheckbox, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/"+_.capitalize(req.body.title));
    }
  });
})

// start server on heroku port if provided
let port = process.env.PORT;
if (port == null || port == "" ) {
  port = 3000;
}

app.listen(port, () => {
  console.log("server has started successfully!");
})
