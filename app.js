// Dependencies
var path = require("path");
var fs = require("fs");
var express = require("express");
var data = require("./db.json");

// Setting up express
var PORT = process.env.PORT || 3000;
var app = express();

// Sets up express to handle parsing of data
app
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(express.static("lib"));

// Instantiating our notes array
var notes = [];

// Console logs listening to express port
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

// Displays index page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./lib/index.html"));
});

// Displays notes page
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./lib/notes.html"));
});

// Retrieves and displays all notes
app.get("/api/notes", function (req, res) {
  let json = getJson();
  res.json(json);
});

// Creates ID for note
const id = () => {
  return Math.floor(Math.random() * 200);
};

// Create new notes - takes in JSON input and write to json file
app.post("/api/notes", function (req, res) {
  const data = fs.readFileSync("./db.json", "utf8");

  notes = JSON.parse(data);

  // Sets newNote equal to request.body
  var newNote = req.body;

  // Sets newNote.id equal to a randomly generated ID
  newNote.id = id();

  // Pushes the note object into the notes array
  notes.push(newNote);

  // Sends a json response with the notes to the API
  res.json(newNote);

  // Stringifies var contents
  const json = JSON.stringify(notes);

  // Writes to db.json file the contents of the json var
  fs.writeFileSync("db.json", json, "utf8");
});

// Deletes specified note
app.delete("/api/notes/:id", function (req, res) {
  notes = fs.readFileSync("./db.json", "utf-8");
  notes = JSON.parse(notes)

  // Setting deletedNote equal to id of note we want to delete
  const deletedNote = req.params.id;

  // Filtering through notes array and returning notes that do not have id of deletedNote
  notes = notes.filter((note) => {
    return note.id != deletedNote;
  });

  // Creating new permanent notes const
  const permaNotes = JSON.stringify(notes);

  // Writing to db.json file
  fs.writeFileSync("./db.json", permaNotes, "utf8", (err) => {
    if (err) throw err;
  });

  // Send json response
  res.json(permaNotes);
});

function getJson() {
  let data = fs.readFileSync(__dirname + "/db.json");
  let json = JSON.parse(data);
  return json;
}
