import * as functions from "firebase-functions";
import { Request, Response } from "express";
const parkKey = process.env.NATIONAL_PARKS_KEY;

export const fetchCampground = functions.https.onRequest(
  async (req: Request, res: Response): Promise<void> => {
    const stateCode = req.query.stateCode

    if (!stateCode) {
      res.status(400).json({ message: "State code is required" });
      return;
    }

    const url: string = `https://developer.nps.gov/api/v1/campgrounds?stateCode=${stateCode}&api_key=${parkKey}`;

    try {
      const response = await fetch(url, {
        method: "get",
        headers: {
          "Content-type": "application/json",
        },
      });

      // Check if the response is not successful
      if (response.status !== 200) {
        console.log("Error fetching");
        res
          .status(response.status)
          .json({ message: "Error fetching campgrounds" });
        return;
      }

      const result: object = await response.json();
      res.status(200).json(result);
    } catch (error) {
      console.error("Error calling third-party API:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);
