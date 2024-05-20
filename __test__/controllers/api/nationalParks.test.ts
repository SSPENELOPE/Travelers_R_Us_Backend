import request from "supertest";
import NationalParksFetcher from "../../../src/Handlers/nationalParksHandler";
import app from "../../../src/app";

jest.mock("../../../src/Handlers/nationalParksHandler", () => ({
  fetchParks: jest.fn(),
  findTrails: jest.fn(),
}));

describe("National Parks Router", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /parks", () => {
    it("should respond with parks data", async () => {
      const mockParks = [{ name: "Park 1" }, { name: "Park 2" }];
      (NationalParksFetcher.fetchParks as jest.Mock).mockResolvedValue(
        mockParks
      );

      const response = await request(app)
        .get("/api/get/parks")
        .query({ page: 1, limit: 10 });

      expect(NationalParksFetcher.fetchParks).toHaveBeenCalledWith(1, 10);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockParks);
    });

    it("should handle error when fetching parks", async () => {
      (NationalParksFetcher.fetchParks as jest.Mock).mockResolvedValue("error");

      const response = await request(app)
        .get("/api/get/parks")
        .query({ page: 1, limit: 10 });

      expect(NationalParksFetcher.fetchParks).toHaveBeenCalledWith(1, 10);
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

    describe('GET /trails', () => {
        it('should respond with trails data', async () => {
          const mockTrails = [{ name: 'Trail 1' }, { name: 'Trail 2' }];
          (NationalParksFetcher.findTrails as jest.Mock).mockResolvedValue(mockTrails);
    
          const response = await request(app).get('/api/get/trails');
          
          expect(NationalParksFetcher.findTrails).toHaveBeenCalled();
          expect(response.status).toBe(200);
          expect(response.body).toEqual(mockTrails);
        });
    
        it('should handle error when fetching trails', async () => {
          (NationalParksFetcher.findTrails as jest.Mock).mockResolvedValue('error');
    
          const response = await request(app).get('/api/get/trails');
    
          expect(NationalParksFetcher.findTrails).toHaveBeenCalled();
          expect(response.status).toBe(500);
          expect(response.body).toEqual({ message: 'Error fetching trails' });
        });
      });
  });
});