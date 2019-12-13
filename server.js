// Create a basic server using Express.JS
// Dependencies
// =============================================================
    const express = require("express");
    const path = require("path");
    const app = express();
    
    const PORT = process.env.PORT || 3000;

    // Sets up the Express app to handle data parsing
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // * Create a few array variables that will hold the data
    const reservations = [{
        name: "jake",
        date: "10/10",
        guests: 2
    }];
    const waitlist = [{
        name: "kristen",
        date: "10/10",
        guests: 2
    }];
    // * Create a set of routes for getting and posting table data
    // Display all reservations
    app.get("/api/reservations", function(req, res) {
        return res.json(reservations);
    });
    
    app.get("/api/waitlist", function(req, res) {
        return res.json(waitlist);
    });
    
    // Create New Reservation - takes in JSON input
    app.post("/api/reservations", function(req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        const newReservations = req.body;
        
        // Using a RegEx Pattern to remove spaces from newCharacter
        // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
        newReservations.routeName = newReservations.name.replace(/\s+/g, "").toLowerCase();
        
        console.log(newReservations);
        
        reservations.push(newReservations);
        
        res.json(newReservations);
    });

    // Create New Reservation - takes in JSON input
    app.post("/api/waitlist", function(req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        const newWaitlist = req.body;
        
        // Using a RegEx Pattern to remove spaces from newCharacter
        // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
        newWaitlist.routeName = newWaitlist.name.replace(/\s+/g, "").toLowerCase();
        
        console.log(newWaitlist);
        
        waitlist.push(newWaitlist);
        
        res.json(newWaitlist);
    });
    // * Create a set of routes for displaying the HTML pages
    // Basic route that sends the user first to the AJAX Page
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "home.html"));
    });
  
    app.get("/home", function(req, res) {
        res.sendFile(path.join(__dirname, "home.html"));
    });

    app.get("/reservations", function(req, res) {
        res.sendFile(path.join(__dirname, "reserve.html"));
    });
    // Starts the server to begin listening
    // =============================================================
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
    // * Use jQuery to run AJAX calls to GET and POST data from users to the Express server