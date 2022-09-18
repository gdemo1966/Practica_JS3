//Arreglo de pizzas sobre el que trabajamos.
let Pizzas = [
{
  id: 1,
  nombre: 'Mozzarella',
  ingredientes: ['Mozzarella', 'Salsa', 'Aceitunas'],
  precio: 900
},
{
  id: 2,
  nombre: 'Fugazzeta',
  ingredientes: ['Mozzarella','Cebolla', 'Oliva', 'Oregano', 'Aceituna'],
  precio: 1000,
},
{
  id: 3,
  nombre: 'Roquefort',
  ingredientes: ['Salsa', 'Mozzarella', 'Jamon', 'Roquefort', 'Aceitunas'],
  precio: 590
},
{
  id: 4,
  nombre: 'Napolitana',
  ingredientes: ['Salsa', 'Mozzarella', 'Cherrys', 'Ajo', 'Perejil', 'Aceitunas'],
  precio: 1200
},
{
  id: 5,
  nombre: 'Rucula y crudo',
  ingredientes: ['Salsa', 'Mozzarella', 'Jamon crudo', 'Rucula', 'Parmesano', 'Aceitunas'],
  precio: 1400
},
{
  id: 6,
  nombre: 'Espinaca',
  ingredientes: ['Salsa blanca', 'Espinaca', 'Mozarella', 'Nueces', 'Aceituna'],
  precio: 280
}
]

//Arreglo con las imagenes que pretendemmos agregar.
const imagenesPizzas = [
  {
    src: ".\\assets\\img\\Muzarella.jpg"
  },
  {
    src: ".\\assets\\img\\Fugazzeta.jpg"
  },
  {
    src: ".\\assets\\img\\Roquefort.jpg"
  },
  {
    src: ".\\assets\\img\\Napolitana.jpg"
  },
  {
    src: ".\\assets\\img\\Rucula_y_crudo.jpg"
  },
  {
    src: ".\\assets\\img\\Espinaca.jpg"
  }
]

//Defino una variable en la que voy a mostrsr la lista de sabores de pizzas disponibles.
let listaSabores = document.getElementById('lista-sabores');

//Arreglo de pizzas con la informacion completa de todas las pizzas, guardada en LocalStorage.
let itemesSabores = JSON.parse(localStorage.getItem("ArrayPizzas"));

/* Tomo los elementos necesarios */
const nombrePizza = document.getElementById('nombre-pizza');
const imagenCard = document.querySelector('.card-img');
const mensajeError = document.getElementById('mensaje-error');

const ingredientesPizza = document.getElementById('ingredientes-pizza');
const precioPizza = document.getElementById('precio-pizza');
const form = document.getElementById('form');
const valorInput = document.getElementById('input');
const botonEnviar = document.getElementById('boton');

//Funcion SaveToLocalStorage(). Guarda la lista de pizzas en el localStorage.
const SaveToLocalStorage = (arrayPizzas) => {
  localStorage.setItem("ArrayPizzas", JSON.stringify(arrayPizzas));
  itemesSabores = JSON.parse(localStorage.getItem("ArrayPizzas"));
}

//Funcion RenderListaSabores(). Renderiza (pinta en pantalla), la lista de 
//los sabores existentes de pizzas.
const renderListaSabores = (saboresPizzas) => {
  listaSabores.innerHTML = saboresPizzas.map((saborPizza) =>
        `<li>${saborPizza.nombre}</li>`
    )
    .join("");
};

//Funcion ResetInput(). Inicializa la pagina con las pizzas disponibles y
//blanquea selección.
const ResetInput = () => {
  const hayImagenesDePizzas = Pizzas.find(item => item.imagen !== undefined);

  if (hayImagenesDePizzas === undefined) {
    let indice = 1;

    for (const e of imagenesPizzas) {
      let findPizzas = Pizzas.find(item => item.id === indice)

      if (findPizzas !== undefined) {
        findPizzas.imagen = e;
      } else {
        mensajeError.textContent = 'Intenta cargar un elemento invalido';
      }
      indice++;
    }
  }
  SaveToLocalStorage(Pizzas);
  renderListaSabores(itemesSabores);
};

//Funcion ResetDatosPizzas(). Blanquea los datos de la ultima lista elegida.
const ResetDatosPizzas = () => {
    return imagenCard.innerHTML = `<img src="./assets/img/Pizzas.jpg" alt="Pizzas" id="imagen" />`,
    nombrePizza.innerHTML = `Nombre:`,
    ingredientesPizza.innerHTML = `Ingredientes:`,
    precioPizza.innerHTML = `Precio $.:`;
};

//Funcion RenderDatosPizzas(). Pinta en la pantalla los datos de las pizza elegida
const RenderDatosPizzas = () => {
  if (!valorInput.value) {
    ResetDatosPizzas();
    mensajeError.textContent = 'Debe indicar un n° entero mayor a 0';
    return;
  } else if (!itemesSabores.length) {
    ResetDatosPizzas();
    mensajeError.textContent = 'No disponemos de la lista de pizzas disponibles.';
    return;  
  } else {
    const PizzaBuscada = itemesSabores.find(item => item.id === valorInput.valueAsNumber)
    if (!PizzaBuscada) {
      ResetDatosPizzas();
      mensajeError.textContent = 'Debe indicar un n° de pizza válido. Revise el menú de la izquierda.';
      return; 
    } else {
        const ingreditesPizzaBuscada = PizzaBuscada.ingredientes.join(', ');
        console.dir(imagenCard.innerHTML);
        console.dir(PizzaBuscada);
        return imagenCard.innerHTML = `<img src=${PizzaBuscada.imagen.src} alt="Pizzas" id="imagen"/>`,
        nombrePizza.innerHTML = `Nombre: <span>${PizzaBuscada.nombre}<span>`,
        ingredientesPizza.innerHTML = `Ingredientes: <span>${ingreditesPizzaBuscada}<span>`,
        precioPizza.innerHTML = `Precio $.: <span>${PizzaBuscada.precio}</span>`;
    }    
  }
};

//Funcion SubmitForm(). Asociada al botón enviar (submit). Renderiza los datos de la pizza seleccionada
//o mensajes de error, según corresponda.
const submitForm = (e) => {
   e.preventDefault();

   RenderDatosPizzas();

};

const init = () => {
   window.addEventListener("DOMContentLoaded", ResetInput);
  
   form.addEventListener("submit", submitForm);
};

init();