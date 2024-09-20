const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const PORT = 5002;
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
app.set("view engine", "ejs")

const getEvents = () =>{
    const data = fs.readFileSync("./data/events.json", "utf8");
    // console.log(data);
    return JSON.parse(data)
}
const saveEvents = (events) =>{
    fs.writeFileSync("./data/events.json", JSON.stringify(events, null, 2))

}


app.get("/events", function (req, res) {
    const data = getEvents();
    res.render("events", {data});
});

app.get("/admin", function (req, res) {
    const data = getEvents();
    res.render("admin", {data});
    
});

app.get("/newEvent", function (req, res) {
    res.render("newEvent")
    })
app.post("/Adder", function (req, res) {
        const data = getEvents();
        console.log("req.body.bride_name")
        const newEvent = {
            id: data.length+1,
            bride_name: req.body.bride_name,
            groom_name:req.body.groom_name,
            wedding_date:req.body.wedding_date,
            venue:{
                name:req.body.venueName,
                address:req.body.venueAddress
            },
            guest_capacity:req.body.guest_capacity,
            guests_attending:0,
            ceremony_time:req.body.eventsStart1,
            reception_time:req.body.eventsStart2,
            events:[
                {
                    name:req.body.eventsStart1,
                    location:req.body.eventsLocation1,
                    start_time:req.body.eventsStart1,
                    end_time:req.body.eventsEnd1
                },
                {
                    name:req.body.eventsStart2,
                    location:req.body.eventsLocation2,
                    start_time:req.body.eventsStart2,
                    end_time:req.body.eventsStart2
                }
            ]
        }
        data.push(newEvent);
        saveEvents(data);
        res.redirect("/events");
    });
    
    app.post("/delete/:wedding_id", function (req, res) {
        const data = getEvents();
        const updatedData = data.filter(event => event.wedding_id !== parseInt(req.params.wedding_id));
        saveEvents(updatedData);
        res.redirect("/events");
    });
    
    app.post("/data/:wedding_id", function (req, res) {
        const data = getEvents(); 
        const wedding_id = parseInt(req.params.wedding_id);
        const event = data.find(event => event.wedding_id === wedding_id);
    
        if (event) {
            event.guests_attending = (event.guests_attending || 0) + 1; 
            saveEvents(data);
            res.redirect("/events");
        }
    });
    
    
    
    app.post("/editor/:wedding_id", function (req, res) {
        const data = getEvents();
        const wedding_id = parseInt(req.params.wedding_id);
        const event = data.find(event => event.wedding_id == wedding_id);
        res.render("editor", {event})
    });


    app.post("/data/:wedding_id", function (req, res) {
        const data = getEvents();
        const wedding_id = parseInt(req.params.wedding_id);
        const eventIndex = data.findIndex(event => event.wedding_id == wedding_id);
    
        if (eventIndex != -1) {
            data[eventIndex] = {
                wedding_id: wedding_id,
                bride_name: req.body.bride_name,
                groom_name: req.body.groom_name,
                wedding_date: req.body.wedding_date,
                venue: {
                    name: req.body.venueName,
                    address: req.body.venueAddress,
                },
                guest_capacity: req.body.guest_capacity,
                guests_attending: 0,
                ceremony_time: req.body.eventsStart1,
                reception_time: req.body.eventsStart2,
                events: [
                    {
                        name: req.body.eventsName1,
                        location: req.body.eventsLocation1,
                        start_time: req.body.eventsStart1,
                        end_time: req.body.eventsEnd1,
                    },
                    {
                        name: req.body.eventsName2,
                        location: req.body.eventsLocation2,
                        start_time: req.body.eventsStart2,
                        end_time: req.body.eventsEnd2,
                    },
                ],
            };
    
            saveEvents(data)
            res.redirect("/events"); 
        }});
    
    

// app.post("/editor", function (req, res) {
//     const data = getEvents();
//     const newEvent = {
//         id: data.length+1,
//         bride_name: req.body.bride_name
//     }
//     data.push(newEvent);
//     saveEvents(data);
//     res.redirect("/events")
// })






// Set the view engine to ejs
app.set("view engine", "ejs");




// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
}); 