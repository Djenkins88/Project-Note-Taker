const express = require('express');
const fs = require("fs");
const path = require("path");
const notes = require("./db/db.json");
const uuid = require("uuid");



// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));


app.get("/api/notes", (req, res) => { 
    res.sendFile(path.join(__dirname, "./db/db.json"));
});
    
//function to add new note
app.post("/api/notes", (req, res) => {
    // Read data from 'db.json' file
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
        
    // Extracted new note from request body.  
    const newNotes = req.body;
            
    newNotes.id = uuid.v4();
    // Pushed new note in notes file 'db.json'
    notes.push(newNotes);
        
    // Written notes data to 'db.json' file
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
        
    // Send response
    res.json(notes);
});

//fuction for deleting
app.delete("/api/notes/:id", (req, res) => {
    // Read data from 'db.json' file
    const notes = JSON.parse(fs.readFileSync("./db/db.json", ));
        
    // filter data to get notes except the one to delete
    const delNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
        
    // Write new data to 'db.json' file
    fs.writeFileSync('./db/db.json', JSON.stringify(delNote));
    
    // Send response
    res.json(delNote);
});

//Homepage calls
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});



