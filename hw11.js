
//write, save, delete notes
//express backend 
//save and retrieve data from note json file

//   * GET `/notes` - Should return the `notes.html` file.
//   * GET `*` - Should return the `index.html` file

// * The application should have a `db.json` file on the backend that will be used to store and retrieve notes using the `fs` module.

// * The following API routes should be created:

//   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.

//   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

//   * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete.
// This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a 
//note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and 
//then rewrite the notes to the `db.json` file.




// Dependencies
var express = require ("express");
var path = require("path");
var fs = require ("fs");
var inquirer = require ("inquirer");
var app = express();
var PORT = 3001;
const { v4: uuidv4 } = require('uuid');

//call the function you get from UUID -> it generates a unique number

//Heroku insall guiide -> in 11 supplmental folder

//import { v4 as uuidv4} from 'uuid';
//create JSON 
//or handle error

// let counter = 1; //set initial value at zero. so it will exist before incrementing

let notes = [];

function start() {
fs.readFile("db.json", "utf8", function (error, data) {
//create conditional here to parse onle if there is no error
    notes = JSON.parse(data);//check if data is undefined before we do this. If undefined, set notes to nothing
 inquirer
  .prompt([
         {
           type: "input",
           message: "please enter a note",
           name: "note",
         },
       ])
       .then((response) => handleresponse (response, notes) );
   });
 } function handleresponse(response, notes) {
  
  //could put a try block here
  
    const note = { 
     id: uuidv4(),
     note: response.note,
    }

   notes.push(note);
   fs.writeFile("notes.json", JSON.stringify(notes), function (err) {
     inquirer
       .prompt([
         {
           type: "input",
           message: "Enter another note",
           name: "again",
         },
       ])
       .then((response)=>{
         if(response.again === "yes") {
             start();
         }
       });
   });

 }
 
 start();


//filter functino

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());



// //route to HTMLs
// app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "home.html"));
//   });
  
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
  
  

  app.get("/assets/css/styles.css", function(req, res) {   
    res.sendFile(path.join(__dirname, "../public/assets/css/styles.css"));
  });

  app.get("/assets/js/index.js", function(req, res) {   
    res.sendFile(path.join(__dirname, "../public/assets/js/index.js"));
  });

//asterix is always last (it is the catchall)
  app.get("*", function(req, res) {   
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  


  // Route to APIs 
  app.get("/api/notes", function(req, res) {
    return res.json(notes);
  });

//Post to APIs
app.post("/api/notes", function(req, res) {
    var i = req.body  
     //respond with notes
    notes.push(i); 
    res.json(notes);
  });

  //function call to update json file
  //after array, update json file
  //if ID is 0 it won't show, use UUID
  //link to CSS to every page -> Every page that uses it will need to load it
  //Heroku -> something like start scripts -> check before pushing to Heroku
  

  app.delete("/api/notes/:id", function(req, res) {

});

  // Starts the server to begin listening

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

// Application should allow users to create and save notes.
// Application should allow users to view previously saved notes.
// Application should allow users to delete previously saved notes.
