import { Application, Request, Response } from "express";
const parkKey = process.env.NATIONAL_PARKS_KEY;

export function fetchParks(app: Application) {
  app.post("/parks", async (req: Request, res: Response) => {
    const limit: string = req.body.limit;
    const page: string = req.body.page;
    const url: string = `https://developer.nps.gov/api/v1/parks?limit=${limit}&start=${page}&api_key=${parkKey}`;

    if (!limit || !page) {
      res.status(400).json({ message: "Page and Limit is required" });
      return;
    }

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
        res.status(response.status).json({ message: "Error fetching parks" });
        return;
      }

      const result: object = await response.json();
      res.status(200).json(result);
    } catch (error) {
      console.error("Error calling third-party API:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
}
