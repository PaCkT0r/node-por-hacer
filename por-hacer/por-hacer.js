const fs = require("fs");

let listadoPorHacer = [];

const guardarDB = () => {
  let data = JSON.stringify(listadoPorHacer);

  fs.writeFile("database/data.json", data, (err) => {
    if (err) throw new Error("No se pudo grabar", err);
  });
};

const cargarDB = () => {
  try {
    listadoPorHacer = require("../database/data.json");
  } catch (error) {
    listadoPorHacer = [];
  }
};

const crear = (descripcion) => {
  cargarDB();

  let porHacer = {
    descripcion,
    completado: false,
  };

  listadoPorHacer.push(porHacer);

  guardarDB();

  return porHacer;
};

const getListado = () => {
  cargarDB();
  return listadoPorHacer;
};

const actualizar = (descripcion, completado = true) => {
  cargarDB();
  let index = listadoPorHacer.findIndex(
    (tarea) => tarea.descripcion === descripcion
  );

  if (index >= 0) {
    listadoPorHacer[index].completado = completado;
    guardarDB();
    return true;
  } else {
    return false;
  }
};

const borrar = (descripcion) => {
    //Carga la base
    cargarDB();
    //Crea un nuevo arreglo con la condición
  let nuevoListado = listadoPorHacer.filter( tarea  => tarea.descripcion !== descripcion);

  // Valida si se efectuo la eliminación del cambio o no.
  if(listadoPorHacer.length === nuevoListado.length){
      return false;
  }else{
      //Si se efecuto el cambio asigna el nuevo arreglo al arreglo listadoporHacer y se almacena en la DB
      listadoPorHacer = nuevoListado;
      guardarDB();
      return true;
  }
}

module.exports = {
  crear,
  getListado,
  actualizar,
  borrar,
};
