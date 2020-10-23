// Dependancies TODO: Spell Check ME
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Global Variables
let notes = [];




//Routes
//================================
//Gets
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//TODO: Comment this
app.get("/api/notes", function (err, res) {
    notes = fs.readFileSync("db/db.json", "utf8");
    notes = JSON.parse(notes);
    res.json(notes);
});

//Posts
app.post("/api/notes", function (req, res) {
    notes = fs.readFileSync("db/db.json", "utf8");
    console.log(notes);
    notes = JSON.parse(notes);
    req.body.id = notes.length;
    notes.push(req.body);
    notes = JSON.stringify(notes);
    fs.writeFile("db/db.json", notes, "utf8", function (err) {
        if (err) throw err;
    });
    res.json(JSON.parse(notes));
});

//Delete A Note
app.delete("/api/notes/:id", function (req, res) {

    notes = fs.readFileSync("db/db.json", "utf8");

    notes = JSON.parse(notes);

    notes = notes.filter(function (note) {
        return note.id != req.params.id;
    });

    fs.writeFile("db/db.json", notes, "utf8", function (err) {

        if (err) throw err;
    });
    notes = JSON.stringify(notes);


    res.send(JSON.parse(notes));
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});