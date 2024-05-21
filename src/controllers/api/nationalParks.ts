import { Router, Request, Response } from "express";
import NationalParksFetcher from "../../utils/nationalParksHandler";
const router: Router = Router();

// Route to find parks
router.get("/parks", async (req: Request, res: Response): Promise<any> => {
  const { page, limit } = req.query;

  if (!page || !limit) {
    return res
      .status(400)
      .send({ message: "Page and limit query parameters are required" });
  }

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  try {
    const parks: Promise<any> = await NationalParksFetcher.fetchParks(
      pageNumber,
      limitNumber
    );
    if (await parks === "error") {
      return res.status(500).send({ message: "Error fetching parks" });
    }
    res.status(200).send(parks);
  } catch (error) {
    res.status(500).send({ message: "Server error", error });
  }
});

// Route to find trails
router.get("/trails", async (req: Request, res: Response): Promise<any> => {
  try {
    const trails: Promise<any> = await NationalParksFetcher.findTrails();
    if (await trails === "error") {
      return res.status(500).send({ message: "Error fetching trails" });
    }
    res.status(200).send(trails);
  } catch (error) {
    res.status(500).send({ message: "Server error", error });
  }
});

// Route to find campgrounds
router.get('/campgrounds/:stateCode', async (req: Request, res: Response): Promise<any> => {
  try {
    const stateCode: string = req.params.stateCode;
    const campgroundData: Promise<any> = await NationalParksFetcher.findCampgrounds(stateCode);

    if(await campgroundData === 'error') {
      return res.status(500).send({ message: "Error fetching campgrounds" });
    }

    res.status(200).json(campgroundData);
  } catch (error) {
    res.status(500).send({ message: "Server error", error });
  }
})



export default router;