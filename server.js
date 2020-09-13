const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 8000;
const routes = require("./api.js");

//handles POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/", routes);

//app.get
app.get("/notes", (request, response) => {
    // fs.readFile("./public/notes.html", "utf8", (error,data)=>{
    //     response.send(data);
    response.sendFile(__dirname + "/public/notes.html");
});
// });

app.get("*", (request, response) => {
    // fs.readFile("./public/index.html", "utf8", (error,data)=>{
    //     response.send(data);
    response.sendFile(__dirname + "/public/index.html");
});
// });

//Listener
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

app.listen(PORT, () => {
    console.log("Listening on port 8000");
});

