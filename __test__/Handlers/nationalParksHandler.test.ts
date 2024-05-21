/*
 * THIS IS THE TEST SUITE FOR THE NATIONAL PARKS HANDLER CLASS
 * THAT CALLS ON THIRD PARTY APIS DIRECTLY
 * USING A KEYS FROM THE ENV FILE
 */

import fetchMock from "fetch-mock";
import NationalParksHandler from "../../src/utils/nationalParksHandler";
import dotenv from "dotenv";

dotenv.config();

// NATIONAL PARKS HANDLER TEST SUITE
describe("NationalParksHandler", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  // FETCH PARKS
  describe("fetchParks", () => {
    // SUCCESS
    it("should fetch parks data successfully", async () => {
      const mockResponse = { data: "park data" };
      const page = 1;
      const limit = 10;
      const url = `https://developer.nps.gov/api/v1/parks?limit=${limit}&start=${page}&api_key=${process.env.NATIONAL_PARKS_KEY}`;

      fetchMock.getOnce(url, {
        body: mockResponse,
        headers: { "Content-Type": "application/json" },
      });

      const parksData = await NationalParksHandler.fetchParks(page, limit);
      expect(parksData).toEqual(mockResponse);
    });

    // HANDLE ERROR
    it("should handle fetch error", async () => {
      const page = 1;
      const limit = 10;
      const url = `https://developer.nps.gov/api/v1/parks?limit=${limit}&start=${page}&api_key=${process.env.NATIONAL_PARKS_KEY}`;

      fetchMock.getOnce(url, 500);

      const result = await NationalParksHandler.fetchParks(page, limit);
      expect(result).toEqual("error");
    });
  });

  // FETCH TRAILS
  describe("findTrails", () => {
    // SUCCESS
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

      const trailsData = await NationalParksHandler.findTrails();
      expect(trailsData).toEqual({
        headers: options.headers,
        method: "GET",
        body: mockResponse,
      });
    });

    // HANDLE ERROR
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

      const result = await NationalParksHandler.findTrails();
      expect(result).toEqual({
        headers: options.headers,
        method: "GET",
        status: 500,
      });
    });
  });

  // TEST THE CAMPGROUND HANDLER
  describe("Fetch Campgrounds", () => {
    const stateCode: string = "GA";
    const url: string = `https://developer.nps.gov/api/v1/campgrounds?stateCode=${stateCode}&api_key=${process.env.National_Parks_Key}`;
    // SUCCESS
    it("should return a list of campgrounds in the us national parks by state code", async () => {
      const mockResponse: Object = { data: "park data" };

      fetchMock.getOnce(url, {
        body: mockResponse,
        headers: { "Content-Type": "application/json" },
      });

      const campgroundData = await NationalParksHandler.findCampgrounds(
        stateCode
      );
      expect(campgroundData).toEqual(mockResponse);
    });

    // ERROR
    it("should handle error when fetching campgrounds", async () => {
  
      fetchMock.getOnce(url, 500);

      const result = await NationalParksHandler.findCampgrounds(stateCode);
      expect(result).toEqual("error");
    });
  });

  // END TEST'S, ADD AS NECCESSARY
});
