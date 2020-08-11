// Dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");

// Setting up express
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up express to handle parsing of data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Instantiating our notes array
var notes = [];

// Server routes
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.listen(PORT, function () {
  console.log("App listening on " + PORT);
});

// Retrieves and displays all notes
app.get("/api/notes", function (req, res) {
  res.json(db);
});
