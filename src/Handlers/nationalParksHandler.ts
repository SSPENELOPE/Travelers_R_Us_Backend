import dotenv from 'dotenv';
dotenv.config();

const parkKey: string = process.env.National_Parks_Key;
const XRapidKey: string = process.env.X_RapidAPI_Key;
const XRapidHost: string = process.env.X_RapidAPI_Host;

class NationalParksFetcher {

    async fetchParks(page: number, limit: number): Promise<any> {
      console.log(page, limit);
      const url = `https://developer.nps.gov/api/v1/parks?limit=${limit}&start=${page}&api_key=${parkKey}`;
  
      try {
        const parksResponse = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!parksResponse.ok) {
          console.log('Error fetching');
          return 'error';
        }
  
        const parkData = await parksResponse.json();
        return parkData;
      } catch (error) {
        console.error('Error fetching parks:', error);
        return 'error';
      }
    }
  
    async findTrails(): Promise<any> {
      const url =
        'https://trailapi-trailapi.p.rapidapi.com/activity/?q-country_cont=United%20States&q-state_cont=Georgia&q-activities_activity_type_name_eq=hiking';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': XRapidKey,
          'X-RapidAPI-Host': XRapidHost,
        },
      };
  
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
      } catch (error) {
        console.error(error);
        return 'error';
      }
    }
  }
  
  export default new NationalParksFetcher();