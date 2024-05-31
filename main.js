import './style.css';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.js';

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Examen Unidad I</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector('#counter'));

// Diferencias entre var, let y const

// var (alcance de función, valor por defecto undefined, permite reasignación y redeclaración)
var globalVar; // Declaración global, se puede declarar la variable sin la necesidad de asignare un valor
function ejemploVar() {
  console.log(`globalVar inicio: ${globalVar}`);
  globalVar = 10; //se le puede asignar un valor despues
  console.log(`globalVar asignacion: ${globalVar}`); // Imprime 10
  var localVar = 20; // Declaración local
  globalVar = 100; //Y tambien se le puede reasignar un valor despues
  console.log(`globalVar reasignacion: ${globalVar}`); // Imprime 100
  console.log(`localVar: ${localVar}`); // Imprime 20
}
ejemploVar();
console.log(`globalVar después de la función: ${globalVar}`); // Imprime 100

// let (alcance de bloque, valor por defecto undefined, permite reasignación pero no redeclaración)
function ejemploLet() {
  let blockLet = 30; // Declaración dentro del bloque
  console.log(`blockLet: ${blockLet}`); // Imprime 30
  blockLet = 40; // Reasignación
  console.log(`blockLet después de la reasignación: ${blockLet}`); // Imprime 40
}
ejemploLet();
// console.log(`blockLet fuera del bloque: ${blockLet}`); // Error: ReferenceError: blockLet is not defined

// const (alcance de bloque, valor obligatorio al declarar, no permite reasignación)
function ejemploConst() {
  const blockConst = 50; // Declaración con valor obligatorio
  console.log(`blockConst: ${blockConst}`); // Imprime 50
  // blockConst = 60; // Error: Assignment to constant variable
}
ejemploConst();

console.log('Crear Post:');
async function obtenerUsuario() {
  const urlUsuarios = 'https://jsonplaceholder.typicode.com/users';
  const respuestaUsuarios = await fetch(urlUsuarios);
  const datosUsuarios = await respuestaUsuarios.json();

  // Seleccionar el primer usuario
  const primerUsuario = datosUsuarios[0];
  console.log('Primer usuario:', primerUsuario);

  // Usar el ID del primer usuario para las siguientes acciones
  const idUsuario = primerUsuario.id;
  return idUsuario;
}

async function crearPost(idUsuario) {
  const urlPost = `https://jsonplaceholder.typicode.com/posts`;
  const nuevoPost = {
    title: 'Nuevo post desde JavaScript',
    body: 'Este post fue creado utilizando async/await y JSONPlaceholder.',
    userId: idUsuario,
  };

  const respuestaPost = await fetch(urlPost, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(nuevoPost),
  });

  const datosPost = await respuestaPost.json();
  console.log('Post creado:', datosPost);
}

console.log('Post actualizado:');
async function actualizarPost(idUsuario) {
  const urlPost = `https://jsonplaceholder.typicode.com/posts`;
  const postActualizado = {
    id: idUsuario,
    title: 'Título actualizado desde JavaScript',
    body: 'Este post fue creado utilizando async/await y JSONPlaceholder.',
    userId: 1,
  };

  const respuestaActualizacion = await fetch(urlPost, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postActualizado),
  });

  const datosActualizados = await respuestaActualizacion.json();
  console.log('Post actualizado:', datosActualizados);
}
console.log('Post eliminado:');
async function eliminarPost(idUsuario) {
  const urlPost = `https://jsonplaceholder.typicode.com/posts/idUsuario`;
  const respuestaEliminacion = await fetch(urlPost, {
    method: 'DELETE',
  });

  if (respuestaEliminacion.ok) {
    console.log('Post eliminado exitosamente.');
  } else {
    console.error(
      'Error al eliminar el post:',
      respuestaEliminacion.statusText
    );
  }
}

main();

//Simulación de Promesas
function simularPromesa(tiempoEnSegundos) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const numeroAleatorio = Math.random();
      if (numeroAleatorio > 0.5) {
        resolve('¡Promesa resuelta!');
      } else {
        reject('Promesa rechazada.');
      }
    }, tiempoEnSegundos * 1000);
  });
}

simularPromesa(2)
  .then((resultado) => console.log('Resultado:', resultado))
  .catch((error) => console.error('Error:', error));

//Diferencias entre try-catch y finally
const saldoInicial = 1000;
let saldoActual = saldoInicial;

function retirarEfectivo(cantidad) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (cantidad > saldoActual) {
          reject(new Error('Saldo insuficiente.'));
        }

        if (cantidad % 100 !== 0) {
          reject(new Error('La cantidad debe ser un múltiplo de $100.'));
        }

        saldoActual -= cantidad;
        resolve(
          `Retiro de $${cantidad} realizado con éxito. Saldo actual: $${saldoActual}`
        );
      } catch (error) {
        reject(error);
      } finally {
        console.log('Gracias por usar el cajero automático.');
      }
    }, 8000); // 8 segundos de retardo
  });
}

retirarEfectivo(200) // Retiro exitoso
  .then((mensaje) => console.log(mensaje))
  .catch((error) => console.error('Error:', error.message));

retirarEfectivo(150) // Error: La cantidad debe ser un múltiplo de $100.
  .then((mensaje) => console.log(mensaje))
  .catch((error) => console.error('Error:', error.message));

retirarEfectivo(1200) // Error: Saldo insuficiente.
  .then((mensaje) => console.log(mensaje))
  .catch((error) => console.error('Error:', error.message));

//Consumo de APIs con async/await y .then

console.log('Crear Post:');
async function obtenerUsuario2() {
  const urlUsuarios2 = 'https://jsonplaceholder.typicode.com/users';
  const respuestaUsuarios2 = await fetch(urlUsuarios2);
  const datosUsuarios2 = await respuestaUsuarios2.json();

  // Seleccionar el primer usuario
  const primerUsuario2 = datosUsuarios2[0];
  console.log('Primer usuario:', primerUsuario2);

  // Usar el ID del primer usuario para las siguientes acciones
  const idUsuario2 = primerUsuario2.id;
  return idUsuario2;
}

async function crearPost2(idUsuario2) {
  const urlPost2 = `https://jsonplaceholder.typicode.com/posts`;
  const nuevoPost2 = {
    title: 'Nuevo post desde JavaScript',
    body: 'Este post fue creado utilizando async/await y JSONPlaceholder.',
    userId: idUsuario2,
  };

  const respuestaPost2 = await fetch(urlPost2, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(nuevoPost2),
  });

  const datosPost2 = await respuestaPost2.json();
  console.log('Post creado:', datosPost2);
}

console.log('Post actualizado:');
async function actualizarPost2(idUsuario2) {
  const urlPost2 = `https://jsonplaceholder.typicode.com/posts`;
  const postActualizado2 = {
    id: idUsuario2,
    title: 'Título actualizado desde JavaScript',
    body: 'Este post fue creado utilizando async/await y JSONPlaceholder.',
    userId: 1,
  };

  fetch(urlPost2, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postActualizado2),
  })
    .then((respuestaActualizacion2) => respuestaActualizacion2.json())
    .then((datosActualizados2) =>
      console.log('Post actualizado:', datosActualizados2)
    )
    .catch((error) => console.error('Error al actualizar el post:', error));
}

console.log('Post eliminado:');

async function eliminarPost2(idUsuario2) {
  const urlPost2 = `https://jsonplaceholder.typicode.com/posts/idUsuario2`;

  fetch(urlPost2, {
    method: 'DELETE',
  })
    .then((respuestaEliminacion2) => {
      if (respuestaEliminacion2.ok) {
        console.log('Post eliminado exitosamente.');
      } else {
        console.error(
          'Error al eliminar el post:',
          respuestaEliminacion2.statusText
        );
      }
    })
    .catch((error) => console.error('Error al eliminar el post:', error));
}

async function main() {
  const idUsuario = await obtenerUsuario();
  const idPost = await crearPost(idUsuario);
  await actualizarPost(idPost);
  await eliminarPost(idPost);
  const idUsuario2 = await obtenerUsuario2();
  const idPost2 = await crearPost2(idUsuario2);
  await actualizarPost2(idPost2);
  await eliminarPost2(idPost2);
}
