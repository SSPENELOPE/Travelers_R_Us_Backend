import { Router, Request, Response } from "express";
import FireBaseAPI from "../../utils/fireBaseAPI";
const router: Router = Router();

// Route to find parks
router.get("/parks", async (req: Request, res: Response): Promise<any> => {
  const { page, limit } = req.query as { page: string, limit: string }; 

  if (!page || !limit) {
    return res
      .status(400)
      .send({ message: "Page and limit query parameters are required" });
  }

  try {
    const parks: Promise<any> = await FireBaseAPI.fetchParks(
      page,
      limit
    );

    if (await parks === "error") {
      return res.status(500).json({ message: "Error fetching parks" });
    }
    
    res.status(200).json(parks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Route to find trails
router.get("/trails", async (req: Request, res: Response): Promise<any> => {
  const state: string = req.query.state as string;
  try {
    const trails: Promise<any> = await FireBaseAPI.findTrails(state);
    if (await trails === "error") {
      return res.status(500).json({ message: "Error fetching trails" });
    }
    res.status(200).json(trails);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Route to find campgrounds
router.get('/campgrounds/:stateCode', async (req: Request, res: Response): Promise<any> => {
  try {
    const stateCode: string = req.params.stateCode;
    const campgroundData: Promise<any> = await FireBaseAPI.findCampgrounds(stateCode);

    if(await campgroundData === 'error') {
      return res.status(500).json({ message: "Error fetching campgrounds" });
    }

    res.status(200).json(campgroundData);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
})



export default router;