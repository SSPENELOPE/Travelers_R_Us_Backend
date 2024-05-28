import dotenv from 'dotenv';
import { RequestOptions } from 'https';
dotenv.config();

const TrailURL: string = process.env.Fire_Trails;
const ParkURL: string = process.env.Fire_Parks
const CampgroundURL: string = process.env.Fire_Campground

class FirebaseAPI {
    // Returns the options to the fetch request
     options(method: string, body: object): RequestInit {
      const options: RequestInit = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }
      return options;
    }

    // Finds all national parks
    async fetchParks(page: string, limit: string): Promise<any> {

      try {
        const body: object = {
          page: page,
          limit: limit,
        } 

        const parksResponse: Response = await fetch(ParkURL, this.options("POST", body));
        
        console.log(parksResponse);

        if (!parksResponse.ok) {
          console.log('Error fetching');
          return 'error';
        }
  
        const parkData: object = await parksResponse.json();
        return parkData;
      } catch (error) {
        console.error('Error fetching parks:', error);
        return 'error';
      }
    }
  
    // Finds all hiking trails near the user
    async findTrails(state: string): Promise<any> {

      const body: object = {
        state: state
      }
  
      try {
        const response = await fetch(TrailURL, this.options("POST", body));

        if (!response.ok) {
          console.log('Error fetching');
          return 'error';
        }

        const result: object = await response.json();
        return result;
      } catch (error) {
        console.error(error);
        return 'error';
      }
    }

    async findCampgrounds(stateCode: string): Promise<any> {
      const body: object = {
        stateCode: stateCode
      }
      try {
        const response = await fetch(CampgroundURL, this.options("POST", body));

        if (!response.ok) {
          console.log('Error fetching');
          return 'error';
        }

        const result: object = await response.json();
        return result;
      } catch (error) {
        console.error(error);
        return 'error';
      }
    }
  }
  
  export default new FirebaseAPI();