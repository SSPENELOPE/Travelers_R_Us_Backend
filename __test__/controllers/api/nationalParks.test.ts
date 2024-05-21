import request from "supertest";
import NationalParksHandler from "../../../src/utils/nationalParksHandler";
import app from "../../../src/app";

jest.mock("../../../src/utils/nationalParksHandler", () => ({
  fetchParks: jest.fn(),
  findTrails: jest.fn(),
  findCampgrounds: jest.fn(),
}));

describe("National Parks Router", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // GET PARKS TEST ROUTE
  describe("GET /parks", () => {
    it("should respond with parks data", async () => {
      const mockParks = [{ name: "Park 1" }, { name: "Park 2" }];
      (NationalParksHandler.fetchParks as jest.Mock).mockResolvedValue(
        mockParks
      );

      const response = await request(app)
        .get("/api/get/parks")
        .query({ page: 1, limit: 10 });

      expect(NationalParksHandler.fetchParks).toHaveBeenCalledWith(1, 10);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockParks);
    });

    it("should handle error when fetching parks", async () => {
      (NationalParksHandler.fetchParks as jest.Mock).mockResolvedValue("error");

      const response = await request(app)
        .get("/api/get/parks")
        .query({ page: 1, limit: 10 });

      expect(NationalParksHandler.fetchParks).toHaveBeenCalledWith(1, 10);
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Error fetching parks" });
    });

    it("should respond with 400 if page and limit are not provided", async () => {
      const response = await request(app).get("/api/get/parks");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "Page and limit query parameters are required",
      });
    });
  });

  // GET TRAILS TEST ROUTE
  describe("GET /trails", () => {
    it("should respond with trails data", async () => {
      const mockTrails = [{ name: "Trail 1" }, { name: "Trail 2" }];
      (NationalParksHandler.findTrails as jest.Mock).mockResolvedValue(
        mockTrails
      );

      const response = await request(app).get("/api/get/trails");

      expect(NationalParksHandler.findTrails).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTrails);
    });

    it("should handle error when fetching trails", async () => {
      (NationalParksHandler.findTrails as jest.Mock).mockResolvedValue("error");

      const response = await request(app).get("/api/get/trails");

      expect(NationalParksHandler.findTrails).toHaveBeenCalled();
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Error fetching trails" });
    });
  });

  // GET CAMPGROUND TEST ROUTE
  describe("GET /campgrounds", () => {
    it("should respond with campground by state", async () => {
      const mockCampgrounds = [{ name: "Campground 1"}, { name: "Campground 2"}];
      (NationalParksHandler.findCampgrounds as jest.Mock).mockResolvedValue(mockCampgrounds)

      const response = await request(app).get("/api/get/campgrounds/GA");

      expect(NationalParksHandler.findCampgrounds).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCampgrounds);
    });

    it("should handle error when fetching campgrounds", async () => {
      (NationalParksHandler.findCampgrounds as jest.Mock).mockResolvedValue("error");

      const response = await request(app).get("/api/get/campgrounds/GA");

      expect(NationalParksHandler.findCampgrounds).toHaveBeenCalled();
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Error fetching campgrounds" });
    })
  })
});
