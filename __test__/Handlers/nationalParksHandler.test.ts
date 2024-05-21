/*
 * THIS IS THE TEST SUITE FOR THE NATIONAL PARKS HANDLER CLASS
 * THAT CALLS ON THIRD PARTY APIS DIRECTLY
 * USING A KEYS FROM THE ENV FILE
 */

import fetchMock from "fetch-mock";
import NationalParksHandler from "../../src/utils/nationalParksHandler";
import dotenv from "dotenv";
import { RequestOptions } from "https";

dotenv.config();

// NATIONAL PARKS HANDLER TEST SUITE
describe("NationalParksHandler", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  // FETCH PARKS
  describe("fetchParks", () => {
    // Re-used test variable
    const page: number = 1;
    const limit: number = 10;
    const url: string = `https://developer.nps.gov/api/v1/parks?limit=${limit}&start=${page}&api_key=${process.env.NATIONAL_PARKS_KEY}`;

    // SUCCESS
    it("should fetch parks data successfully", async () => {
      const mockResponse: object = { data: "park data" };

      fetchMock.getOnce(url, {
        body: mockResponse,
        headers: { "Content-Type": "application/json" },
      });

      const parksData = await NationalParksHandler.fetchParks(page, limit);
      expect(parksData).toEqual(mockResponse);
    });

    // HANDLE ERROR
    it("should handle fetch error", async () => {
      fetchMock.getOnce(url, 500);

      const result: Promise<any> = await NationalParksHandler.fetchParks(
        page,
        limit
      );
      expect(result).toEqual("error");
    });
  });

  // FETCH TRAILS
  describe("findTrails", () => {
    // Re-used test variable
    const url: string =
      "https://trailapi-trailapi.p.rapidapi.com/activity/?q-country_cont=United%20States&q-state_cont=Georgia&q-activities_activity_type_name_eq=hiking";
    const options: RequestOptions = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.XRAPIDAPI_KEY,
        "X-RapidAPI-Host": process.env.XRAPIDAPI_HOST,
        "Content-Type": "application/json", // Consolidate headers here
      },
    };

    // SUCCESS
    it("should fetch trails data successfully", async () => {
      const mockResponse: object = { data: "trail data" };

      fetchMock.mock(url, {
        method: "GET",
        headers: options.headers,
        body: mockResponse,
      });

      const trailsData: Promise<any> = await NationalParksHandler.findTrails();
      expect(trailsData).toEqual({
        headers: options.headers,
        method: "GET",
        body: mockResponse,
      });
    });

    // HANDLE ERROR
    it("should handle fetch error", async () => {
      fetchMock.mock(url, {
        method: "GET",
        headers: options.headers,
        status: 500,
      });

      const result: Promise<any> = await NationalParksHandler.findTrails();
      expect(result).toEqual({
        headers: options.headers,
        method: "GET",
        status: 500,
      });
    });
  });

  // TEST THE CAMPGROUND HANDLER
  describe("Fetch Campgrounds", () => {
    // Re-used test variable
    const stateCode: string = "GA";
    const url: string = `https://developer.nps.gov/api/v1/campgrounds?stateCode=${stateCode}&api_key=${process.env.National_Parks_Key}`;
    
    // SUCCESS
    it("should return a list of campgrounds in the us national parks by state code", async () => {
      const mockResponse: Object = { data: "park data" };

      fetchMock.getOnce(url, {
        body: mockResponse,
        headers: { "Content-Type": "application/json" },
      });

      const campgroundData: Promise<any> =
        await NationalParksHandler.findCampgrounds(stateCode);
      expect(campgroundData).toEqual(mockResponse);
    });

    // ERROR
    it("should handle error when fetching campgrounds", async () => {
      fetchMock.getOnce(url, 500);

      const result: Promise<any> = await NationalParksHandler.findCampgrounds(
        stateCode
      );
      expect(result).toEqual("error");
    });
  });

  // END TEST'S, ADD AS NECCESSARY
});
