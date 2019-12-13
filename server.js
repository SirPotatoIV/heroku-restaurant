// Create a basic server using Express.JS
// Dependencies
// =============================================================
const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Create a few array variables that will hold the data
const reservations = [];
const waitlist = [];
// * Create a set of routes for getting and posting table data
// Display all reservations
app.get("/api/reservations", function(req, res) {
    return res.json(reservations);
});
// Display all waitlists
app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
});

// Create New Reservation - takes in JSON input
app.post("/api/reservations", function(req, res) {
    // Checks to see how many reservations there currently are
    if(reservations.length < 6){
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        const newReservations = req.body;
        
        // Using a RegEx Pattern to remove spaces from newCharacter
        // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
        newReservations.routeName = newReservations.name.replace(/\s+/g, "").toLowerCase();
        
        // Console logs the newReservation information in the server side console.
        console.log(newReservations);
        
        // Adds the new reservation to our array reservations
        reservations.push(newReservations);
        
        // Sends the newReservation back to the front-end
        res.json(newReservations);
    // If there are already 5 reservations, the reservation request goes to the waitlist
    }else{
        
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        const newWaitlist = req.body;
        
        // Using a RegEx Pattern to remove spaces from newCharacter
        // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
        newWaitlist.name = newWaitlist.routeName = newWaitlist.name.replace(/\s+/g, "").toLowerCase();
        
        // Console logs the newWaitlist information in the server side console.
        console.log(newWaitlist);
                    
        // Adds the new waitlist to our array waitlist
        waitlist.push(newWaitlist);
    }
    // updateTables()

})

// Update tables with information
function updateTables(){
    fs.readFile('tables.html', 'utf8', function(err, data){
        if(err){
            console.log(err)
            return
        }
        const currentTablesHtml = data;
        const textEntryPoint = currentTablesHtml.indexOf('<div class="card-body" id="tablejs">');
        console.log(textEntryPoint);
    });

}
// updateTables();


// * Create a set of routes for displaying the HTML pages
// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/home", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});