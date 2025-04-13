document.addEventListener("DOMContentLoaded", () => {
    const razaSelect = document.getElementById("razaSelect");
    const btnBuscar = document.getElementById("btnBuscar");
    const btnLimpiar = document.getElementById("btnLimpiar");
    const perroIMG = document.getElementById("perroIMG");

    // Obtener la lista de razas
    fetch("https://dog.ceo/api/breeds/list/all")
                .then(response => response.json())
                .then(data => {
                    for (const raza in data.message) {
                        if (data.message[raza].length > 0) {
                            data.message[raza].forEach(subRaza => {
                                let option = document.createElement("option");
                                option.value = `${raza}/${subRaza}`;
                                option.textContent = `${raza} (${subRaza})`;
                                razaSelect.appendChild(option);
                            });
                        } else {
                            let option = document.createElement("option");
                            option.value = raza;
                            option.textContent = raza;
                            razaSelect.appendChild(option);
                        }
                    }
                })
                .catch(error => console.error("Error al obtener las razas", error));
    // Buscar imagen de la raza seleccionada
    btnBuscar.addEventListener("click", () => {
        const selectedRaza = razaSelect.value;
        if (selectedRaza) {
            fetch(`https://dog.ceo/api/breed/${selectedRaza}/images/random`)
                .then(response => response.json())
                .then(data => {
                    perroIMG.src = data.message;
                    perroIMG.alt = `Imagen de un ${selectedRaza}`;
                })
                .catch(error => console.error("Error al obtener la imagen", error));
        } else {
            alert("Por favor, seleccione una raza.");
        }
    });

    btnLimpiar.addEventListener("click", () => {
        perroIMG.src = "/public/img/perroMuestra.png";
        perroIMG.alt = "";
    });

});


