import {
  inquireMenu,
  leerInput,
  listPlaces,
  pause,
} from "./helpers/inquirer.js";
import { Searches } from "./models/busquedas.js";

const main = async () => {
  const searches = new Searches();
  let opt;

  do {
    opt = await inquireMenu();
    console.log({ opt });

    switch (opt) {
      case 1:
        const searchTerm = await leerInput("City: "); // input
        const places = await searches.city(searchTerm); // busqueda
        const id = await listPlaces(places); // lista de lugares
        const placeSelected = places.find((l) => l.id === id); // de la lista se obtiene el lugar seleccionado
        const weather = await searches.weatherFromPlace( // obtenemos el clima pasando la lat y long
          placeSelected.lat,
          placeSelected.lng
        );

        console.log("\nCity information\n".green);
        console.log("City:", placeSelected.name);
        console.log("Lat:", placeSelected.lat);
        console.log("Lng:", placeSelected.lng);
        console.log("Temperature", weather.temp);
        console.log("Min:", weather.min);
        console.log("Max:", weather.max);
        console.log(`What's the weather like?:`, weather.desc);
        break;

      case 2:
        break;

      case 0:
        break;
    }
    await pause();
  } while (opt !== 0);
};

main();
