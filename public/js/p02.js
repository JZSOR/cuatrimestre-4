const btnBuscar = document.getElementById('buscar');
const btnLimpiar = document.getElementById('limpiar');
const mensaje = document.getElementById('mensaje');
const tabla = document.getElementById('table');
const tbody = document.getElementById('tbody');

btnBuscar.addEventListener('click', buscar);
btnLimpiar.addEventListener('click', limpiar);

function buscar(){
    limpiar();
    const Id = document.getElementById("idjson").value;

    if(!Id){
        mensaje.innerHTML = "No capturaste ninguna ID";
        return;
    }
    
    const http = new XMLHttpRequest;
    const url = "https://jsonplaceholder.typicode.com/albums/" + Id;
    http.open('GET', url, true);
    http.send();

    http.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){

            const datos = JSON.parse(this.responseText);
            const fila = document.createElement('tr');
            
            const col1 = document.createElement('td');
            col1.textContent = datos.userId;
            fila.appendChild(col1);

            const col2 = document.createElement('td');
            col2.textContent = datos.id;
            fila.appendChild(col2);

            const col3 = document.createElement('td');
            col3.textContent = datos.title;
            fila.appendChild(col3);

            tbody.appendChild(fila);
            
            mensaje.innerHTML = "Datos cargados correctamente. ";
          
        } else {
            mensaje.innerHTML = "ID incorrecto o no encontrado. ";
        }
    }
}




function limpiar(){

    tbody.innerHTML = "";
    mensaje.innerHTML = "";
    
}