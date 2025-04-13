const btnBuscar = document.getElementById('btnBuscar');
const btnLimpiar = document.getElementById('btnLimpiar');
const lista = document.getElementById('lista');
const mensaje = document.getElementById('mensaje');
const imagen = document.getElementById('imagen');
const tablaCocteles = document.getElementById('tabla');

btnBuscar.addEventListener('click', cargarCoctel);
btnLimpiar.addEventListener('click', limpiar);

window.onload = cargarLista;

function cargarLista() {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a";

    fetch(url)
        .then(response => {
            if (!response.ok) {
                mensaje.innerHTML = "Error al cargar los cócteles: " + response.status;
                return;
            }
            return response.json();
        })
        .then(data => {
            if (data.drinks) {
                Lista(data.drinks);
            } else {
                mensaje.innerHTML = "No se encontraron cócteles.";
            }
        })
        .catch(error => {
            mensaje.innerHTML = "Surgió un error al cargar los cócteles: " + error;
        });
}

function Lista(cocteles) {
    lista.innerHTML = `<option selected>Seleccionar el cóctel</option>`;
    cocteles.forEach(coctel => {
        const opcion = document.createElement('option');
        opcion.value = coctel.strDrink;
        opcion.textContent = coctel.strDrink;
        lista.appendChild(opcion);
    });
}

function cargarCoctel() {
    const seleccion = lista.value;
    if (seleccion === "Seleccionar el cóctel") {
        mensaje.innerHTML = "Por favor, selecciona un cóctel.";
        return;
    }
    
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${seleccion}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                mensaje.innerHTML = "Error al obtener el cóctel.";
                return;
            }
            return response.json();
        })
        .then(data => {
            if (data.drinks) {
                const coctel = data.drinks[0];
                imagen.src = coctel.strDrinkThumb;
                mensaje.innerHTML = "Datos del cóctel cargados.";
                mostrarDetallesEnTabla(coctel);
            } else {
                mensaje.innerHTML = "No se encontró el cóctel.";
            }
        })
        .catch(error => {
            mensaje.innerHTML = "Surgió un error al cargar el cóctel: " + error;
        });
}


function mostrarDetallesEnTabla(coctel) {
    tablaCocteles.innerHTML = "";

    
    let ingredientes = "";
    for (let i = 1; i <= 15; i++) {
        const ing = coctel[`strIngredient${i}`];
        const med = coctel[`strMeasure${i}`];
        if (ing) {
            ingredientes += (med ? med : "") + " " + ing + "<br>";
        }
    }


    const fila = `
        <tr>
            <td>${coctel.strDrink}</td>
            <td>${ingredientes}</td>
            <td>${coctel.strInstructions}</td>
        </tr>
    `;
    tablaCocteles.innerHTML = fila;
}

function limpiar() {
    imagen.src = "/public/img/tragoMuestra.png";
    mensaje.innerHTML = "";
    lista.value = "Seleccionar el cóctel";
    tablaCocteles.innerHTML = "";
}