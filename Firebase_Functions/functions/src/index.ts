import * as functions from 'firebase-functions';
import { fetchCampground } from "./Fetch_Campground";

exports.helloWorld = functions.https.onRequest((req, res) => {
    console.log("Query Parameters:", req.query); 
    const stateCode = req.query.stateCode
    if (!stateCode) {
        res.status(400).send("State code is missing");
    } else {
        res.send(`Your state code was: ${stateCode}`);
    }
});

exports.fetchCampground = fetchCampground;