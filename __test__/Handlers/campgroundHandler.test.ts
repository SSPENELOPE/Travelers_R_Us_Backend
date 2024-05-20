import fetchMock from "fetch-mock";
import NationalParksFetcher from "../../src/Handlers/nationalParksHandler";
import dotenv from "dotenv";

dotenv.config();

describe("Campground Handler", () => {
  describe("Fetch Campgrounds", () => {
    it("should return a list of campgrounds in the us national parks by state code", async () => {
        const stateCode: string = "GA"
      const mockResponse = { data: "park data" };
      const url = `https://developer.nps.gov/api/v1/campgrounds?stateCode=${stateCode}&api_key=${process.env.National_Parks_Key}`

      fetchMock.getOnce(url, {
        body: mockResponse,
        headers: { "Content-Type": "application/json" },
      });

      const campgroundData = await NationalParksFetcher.fetchCampgrounds(stateCode);
      expect(campgroundData).toEqual(mockResponse);
      expect(campgroundData).toEqual({
        status: 200
      })
    });
  });
});
