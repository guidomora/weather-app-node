import axios from "axios";
import "dotenv/config";

class Searches {
  history = ["Barcelona", "Buenos aires", "Miami"];

  constructor() {
    // leer la db
  }

  get paramsMapBox() {
    return {
      // en vez de tenerlo directo en params creamos este objeto
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "en",
    };
  }

  get paramsWeather(){
    return {
      appid: process.env.OPENWEATHER,
      units: 'metric'
    }
  }

  async city(place = "") {
    try {
      const instance = axios.create({
        //desglosamos toda la url
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`, //base
        params: this.paramsMapBox, //parametros
      });
      const resp = await instance.get();
      return resp.data.features.map((place) => ({
        //obtenemos todos los datos
        id: place.id,
        name: place.place_name_en,
        lng: place.center[0],
        lat: place.center[1],
      }));
      return []; // array con las ciudades que coincidan con lo que escribio la persona
    } catch (error) {
      return [];
    }
  }

  async weatherFromPlace(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: {...this.paramsWeather, lat, lon} // se le agregan la lat y la lon que recibe como argumentos
      })
      const resp = await instance.get()
      const {weather, main} = resp.data // como necesitamos info de 2 lados, desestruturamos la resp
      return {
        desc: weather[0].description, // al ser un array y que solo necesitamos siempre la primer posicion le ponemos un 0
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp
      }
    } catch (error) {
      return [];
    }
  }
}

export { Searches };
