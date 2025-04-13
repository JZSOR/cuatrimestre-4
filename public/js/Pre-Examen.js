const escribePais = document.getElementById("txtBuscar");
const btnBuscar = document.getElementById("btnBuscar");
const btnLimpiar = document.getElementById("btnLimpiar");
const mensaje = document.getElementById('mensaje');
const cardBody = document.getElementById("cardBody");
const url = "https://restcountries.com/v3.1/name/";

btnBuscar.addEventListener("click", () => {
    fetch(url + escribePais.value)
        .then(response => {
            if (!response.ok) {
                alert("Fallo al cargar el pais, codigo de error: " + response.status);
                return;
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                const pais = data[0];

                cardBody.innerHTML = "";

                cardBody.style.display = "flex";
                cardBody.style.flexDirection = "column";
                cardBody.style.alignItems = "center";
                cardBody.style.gap = "20px";

                let card = document.createElement("div"); 
                card.className = 'card';

                let nombreOficial = document.createElement("p");
                nombreOficial.innerHTML = `<strong>Nombre Oficial:</strong> <br> ${pais.name.official}`;
                card.appendChild(nombreOficial);

                let nombreGlobal = document.createElement("p");
                nombreGlobal.innerHTML = `<strong>Nombre Global:</strong> <br> ${pais.name.common}`;
                card.appendChild(nombreGlobal);

                let capitalPais = document.createElement("p");
                capitalPais.innerHTML = `<strong>Capital:</strong> <br> ${pais.capital[0]}`;
                card.appendChild(capitalPais);

                let poblacionPais = document.createElement("p");
                poblacionPais.innerHTML = `<strong>Poblacion:</strong> <br> ${pais.population}`;
                card.appendChild(poblacionPais); 

                let lenguaPais = document.createElement("p");
                lenguaPais.innerHTML = `<strong>Lenguajes:</strong> <br> ${Object.values(pais.languages).join(', ')}`;
                card.appendChild(lenguaPais);

                let cardImagen = document.createElement("div");
                cardImagen.className = 'card';
                cardImagen.style.width = "300px";
                cardImagen.style.margin = "0 auto";

                let imagenBandera = document.createElement("img");
                imagenBandera.src = pais.flags.svg;
                imagenBandera.alt = `Bandera de ${pais.name.common}`;
                imagenBandera.style.width = "100%";
                imagenBandera.style.borderRadius = "8px";
                cardImagen.appendChild(imagenBandera);

                cardBody.appendChild(card);
                cardBody.appendChild(cardImagen);
            } else {
                console.error("No se encontraron datos");
            }
        })
        .catch(error => {
            console.error(error);
        });
});

btnLimpiar.addEventListener("click", () => {
    escribePais.value = "";
    cardBody.innerHTML = "";
});
