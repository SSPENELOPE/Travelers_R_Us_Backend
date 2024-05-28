import {Application, Request, Response } from "express";

const rapidKey = process.env.X_RAPIDAPI_KEY;
const rapidHost = process.env.X_RAPIDAPI_HOST;

export function fetchTrails(app: Application) {
  app.post("/trails", async (req: Request, res: Response): Promise<any> => {
    const state: string = req.body.state;

    if (!state) {
      res.status(400).json({ message: "State is required" });
      return;
    }

    if (!rapidKey || !rapidHost) {
      res.status(500).json({ message: "API keys are not configured properly" });
      return;
    }

    const url: string = 
      `https://trailapi-trailapi.p.rapidapi.com/activity/?q-country_cont=United%20States&q-state_cont=${state}&q-activities_activity_type_name_eq=hiking`;

    try {
      const headers: Record<string, string> = {
        "X-RapidAPI-Key": rapidKey,
        "X-RapidAPI-Host": rapidHost,
        "Content-type": "application/json"
      };

      const response = await fetch(url, {
        method: "GET",
        headers
      });

      if (response.status !== 200) {
        console.log("Error fetching");
        res.status(response.status).json({ message: "Error fetching parks" });
        return;
      }

      const result: object = await response.json();
      res.status(200).json(result);
    } catch (error) {
      console.error("Error calling third-party API:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
)};