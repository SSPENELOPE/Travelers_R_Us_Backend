import { Router, Request, Response } from "express";
import NationalParksFetcher from "../../Handlers/nationalParksHandler";
const router: Router = Router();

router.get("/parks", async (req, res) => {
  const { page, limit } = req.query;

  if (!page || !limit) {
    return res
      .status(400)
      .send({ message: "Page and limit query parameters are required" });
  }

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  try {
    const parks = await NationalParksFetcher.fetchParks(
      pageNumber,
      limitNumber
    );
    if (parks === "error") {
      return res.status(500).send({ message: "Error fetching parks" });
    }
    res.status(200).send(parks);
  } catch (error) {
    res.status(500).send({ message: "Server error", error });
  }
});

// Route to find trails
router.get("/trails", async (req, res) => {
  try {
    const trails = await NationalParksFetcher.findTrails();
    if (trails === "error") {
      return res.status(500).send({ message: "Error fetching trails" });
    }
    res.status(200).send(trails);
  } catch (error) {
    res.status(500).send({ message: "Server error", error });
  }
});

export default router;