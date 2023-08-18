import axios from "axios";
import 'dotenv/config'

class Searches {
  history = ["Barcelona", "Buenos aires", "Miami"];

  constructor() {
    // leer la db
  }

  get paramsMapBox() {
    return { // en vez de tenerlo directo en params creamos este objeto
      access_token:process.env.MAPBOX_KEY,
      limit: 5,
      language: "en",
    };
  }

  async city(place = "") {
    try {
      const instance = axios.create({
        //desglosamos toda la url
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`, //base
        params: this.paramsMapBox //parametros
      });
      const resp = await instance.get();
      console.log(resp.data);
      return []; // array con las ciudades que coincidan con lo que escribio la persona
    } catch (error) {
      return [];
    }
  }
}

export { Searches };
