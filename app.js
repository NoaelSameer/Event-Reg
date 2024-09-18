var express = require("express");
var app = express();
let PORT = 5002;

// let event = "Bob's Event";
// let date = "10:50:39 AM";
// let descc = "A special event for Bob";

// Set the view engine to ejs
app.set("view engine", "ejs");

// Define a route for the "about" page
app.get("/events", function (req, res) {
    res.render("views/pages");
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
}); 