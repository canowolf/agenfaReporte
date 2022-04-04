'use strict'

var registroEntrantes = JSON.parse(localStorage.getItem("Llamadas registradas"));

function verRegistro(btn, fila, datos) {
    const { tiempo, nombre, fijo, identificación, nota, peticion, referencia, reporte } = datos;

    var modalBody = document.getElementsByClassName("modal-body")[0].getElementsByClassName("container-fluid")[0];


    btn.addEventListener('click', function () {
        modalBody.innerHTML = "";

        registroEntrantes.forEach(function (valor, indice) {

            if (tiempo == valor.tiempo && nombre == valor.nombre) {

                for (const valor in datos) {

                    if(valor != "reporte" && valor != "escalar" && valor != "tiempo" && valor != "ani" && valor != "connid" && valor != "titular"){

                        var parrafo = document.createElement("p");
                        parrafo.innerText = valor +": "+datos[valor];
                        modalBody.appendChild(parrafo);
                    }
                    
                    if(valor == "reporte"){
                        let req = datos[valor];
                        for(const value in req){
                            var parr = document.createElement("p");
                            parr.innerText =  value +": "+req[value];
                            modalBody.appendChild(parr);
                        }
                    }
                    
                }

            }
        });
    });
};

function editarRegistro() {
    alert("boton editar");
};

function eliminarRegistro(btn, fila, datos) {

    const { tiempo, nombre } = datos;

    btn.addEventListener('click', function () {

        registroEntrantes.forEach(function (valor, indice) {

            if (tiempo == valor.tiempo && nombre == valor.nombre) {

                registroEntrantes.splice(indice, 1);
                localStorage.setItem("Llamadas registradas", JSON.stringify(registroEntrantes));
                fila.remove();
            }
        });


    });
};

export const btnAcciones = {
    verRegistro,
    editarRegistro,
    eliminarRegistro
};