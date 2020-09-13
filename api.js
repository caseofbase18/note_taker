const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const notes = require("./db/db.json");
const uuid = require("uuid/v1");


router.get("/api/notes", function (req, res) {
    console.log("i'm the get route")
    return res.json(notes);
});

router.post("/api/notes", function (req, res) {
    let newNote = req.body;
    newNote.id = uuid();
    notes.push(newNote);
    console.log(notes);
    fs.writeFile("./db/db.json", JSON.stringify(notes), function (error, data) {
        if (error) throw error
        console.log("Your file is created!")
        res.json(newNote);
    });
});

router.delete("/api/notes/:id", function (req, res) {
    for (let i = 0; i < notes.length; i++) {
        if (req.params.id == notes[i].id) {
            notes.splice(i, 1)
        }
    }
    fs.writeFile("./db/db.json", JSON.stringify(notes), function (error, data) {
        if (error) throw error
        res.send("note deleted");
    });
});

module.exports = router;
