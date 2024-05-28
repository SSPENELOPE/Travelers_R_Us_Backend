import * as functions from 'firebase-functions';
import { fetchCampground } from "./Fetch_Campground";
import { fetchParks } from "./Fetch_Parks";
import { fetchTrails } from "./Fetch_Trails";
import { Request, Response } from "express";
import { Application } from "express";
import express = require('express');
import cors = require('cors');

const app: Application = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Middleware to parse JSON bodies
app.use(express.json());

exports.helloWorld2 = functions.https.onRequest(
    app.post('/test', async (req: Request, res: Response) => {
        console.log("Query Parameters:", req.query); 
        console.log("Request Body: ", req.body);
        const { limit } = req.body;
    
        const stateCode = req.query.stateCode;
        if (!stateCode) {
            res.status(400).send("State code is missing");
        } else {
            res.send(`Your state code was: ${stateCode}, and your limit was ${limit}`);
        }
    })
);

// Export Firebase functions
// Pass the app instance to the functions to register their routes
fetchParks(app);
fetchCampground(app);
fetchTrails(app);

// Export Firebase functions
exports.api = functions.https.onRequest(app);