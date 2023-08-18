import { inquireMenu, leerInput, pause } from "./helpers/inquirer.js";
import { Searches } from "./models/busquedas.js";

const main = async () => {
const searches = new Searches()
    let opt;

  do {
    opt = await inquireMenu();
    console.log({ opt });

    switch (opt) {
      case 1:
        const place = await leerInput("City: ")
        await searches.city(place)


        console.log('\nCity information\n'.green);
        console.log('City:');
        console.log('Lat:');
        console.log('Lng:');
        console.log('Temperature');
        console.log('Min:');
        console.log('Max:');
        break;

      case 2:
        break;

      case 0:
        break;
    }
    await pause()
  } while (opt !== 0);
};

main();
