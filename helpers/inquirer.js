import inquirer from "inquirer"
import colors from "colors"

const questions = [
  // como se crean las opciones de la interfaz con inquirer
  {
    type: "list",
    name: "option",
    message: "what do you want to do?",
    choices: [
      // las opciones y su valor
      {
        value: 1, // el valor va a tener impacto en el switch
        name: `${"1.".green} Search city`,
      },
      {
        value: 2,
        name: `${"2.".green} Results history`,
      },
      {
        value: 0,
        name: `${"3.".green} Exit`,
      },
    ],
  },
];


const pause = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Press ${"ENTER".green} to continue`,
    },
  ];
  console.log("\n"); // oara dejar un espacio entre el mensaje y la linea de arriba
  await inquirer.prompt(question);
};

const inquireMenu = async () => {
  console.clear();
  console.log("=================================".green);
  console.log("        Select an option       ".yellow);
  console.log("=================================\n".green);

  const { option } = await inquirer.prompt(questions); // desestructuramos la question para que no retorne un objeto
  // y solo traiga el value

  return option;
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) { // validaciond el mensaje
        if (value.length === 0 ) {
            return "Please enter a value"
        }
        return true
      }
    },
  ];

  const {desc} = await inquirer.prompt(question)
  return desc
};

const listadoTareasABorrar = async (tareas = []) => { //menu para seleccionar tareas a borrar
  
  const choices = tareas.map((tarea ,i) => { //las opciones

    const indice = `${i + 1}.`.green
    return {
      value: tarea.id, // obtenemos el id cuando seleccionemos
      name: `${indice} ${tarea.desc}` 
    }
  })

  choices.unshift({ //inserta nuevos elementos al principio de un array
    value: '0',
    name: '0.'.green + ' Cancel'
  })

  const question = [
    {
      type: "list",
      name: "id",
      message: 'Delete',
      choices
    }
  ]
  const {id} = await inquirer.prompt(question) // desestructuramos el id de lo que elegimos
  return id
}

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm", //regresa un booleano
      name: "ok",
      message,
    }
  ]
  const {ok} = await inquirer.prompt(question)
  return ok
}

const mostrarListadoCheckList = async (tareas = []) => { //menu para seleccionar tareas a borrar
  const choices = tareas.map((tarea ,i) => { //las opciones
    const indice = `${i + 1}.`.green
    return {
      value: tarea.id, // obtenemos el id cuando seleccionemos
      name: `${indice} ${tarea.desc}`,
      checked: tarea.completedAt ? true : false // las que estan completadas ya las marca
    }
  })

  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: 'Selected',
      choices
    }
  ]
  const {ids} = await inquirer.prompt(question) // un array de ids nos retorna
  return ids
}

export {
  inquireMenu,
  pause,
  leerInput,
  listadoTareasABorrar,
  confirmar,
  mostrarListadoCheckList
};
