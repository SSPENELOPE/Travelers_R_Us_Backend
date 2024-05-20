import fetchMock from "fetch-mock";
import NationalParksFetcher from "../../src/Handlers/nationalParksHandler";
import dotenv from "dotenv";

dotenv.config();

describe("NationalParksFetcher", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("fetchParks", () => {
    it("should fetch parks data successfully", async () => {
      const mockResponse = { data: "park data" };
      const page = 1;
      const limit = 10;
      const url = `https://developer.nps.gov/api/v1/parks?limit=${limit}&start=${page}&api_key=${process.env.NATIONAL_PARKS_KEY}`;

      fetchMock.getOnce(url, {
        body: mockResponse,
        headers: { "Content-Type": "application/json" },
      });

      const parksData = await NationalParksFetcher.fetchParks(page, limit);
      expect(parksData).toEqual(mockResponse);
    });

    it("should handle fetch error", async () => {
      const page = 1;
      const limit = 10;
      const url = `https://developer.nps.gov/api/v1/parks?limit=${limit}&start=${page}&api_key=${process.env.NATIONAL_PARKS_KEY}`;

      fetchMock.getOnce(url, 500);

      const result = await NationalParksFetcher.fetchParks(page, limit);
      expect(result).toEqual("error");
    });
  });

  describe("findTrails", () => {
    it("should fetch trails data successfully", async () => {
      const mockResponse = { data: "trail data" };
      const url =
        "https://trailapi-trailapi.p.rapidapi.com/activity/?q-country_cont=United%20States&q-state_cont=Georgia&q-activities_activity_type_name_eq=hiking";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.XRAPIDAPI_KEY,
          "X-RapidAPI-Host": process.env.XRAPIDAPI_HOST,
          "Content-Type": "application/json", // Consolidate headers here
        },
      };

      fetchMock.mock(url, {
        method: "GET",
        headers: options.headers,
        body: mockResponse,
      });

      const trailsData = await NationalParksFetcher.findTrails();
      expect(trailsData).toEqual({
        headers: options.headers,
        method: "GET",
        body: mockResponse,
      });
    });

    it("should handle fetch error", async () => {
      const url =
        "https://trailapi-trailapi.p.rapidapi.com/activity/?q-country_cont=United%20States&q-state_cont=Georgia&q-activities_activity_type_name_eq=hiking";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.XRAPIDAPI_KEY,
          "X-RapidAPI-Host": process.env.XRAPIDAPI_HOST,
          "Content-Type": "application/json", // Consolidate headers here
        },
      };

      fetchMock.mock(url, {
        method: "GET",
        headers: options.headers,
        status: 500,
      });

      const result = await NationalParksFetcher.findTrails();
      expect(result).toEqual({
        headers: options.headers,
        method: "GET",
        status: 500,
      });
    });
  });
});
