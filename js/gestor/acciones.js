'use strict'

var registroEntrantes = JSON.parse(localStorage.getItem("Llamadas registradas"));

function escalarRegistro(btn, fila, datos) {

    const { tiempo, nombre, fijo, identificación, connid, nota, peticion, referencia, reporte } = datos;
    
    var modalBody = document.getElementsByClassName("modal-body")[0].getElementsByClassName("container-fluid")[0];
    
    
    btn.addEventListener('click', function () {
        modalBody.innerHTML = ""; 
        registroEntrantes.forEach(function (valor, indice) {

            if (tiempo == valor.tiempo && nombre == valor.nombre) {

                var parrafoLine = document.createElement("p");
                parrafoLine.innerHTML = reporte.tipoPendiente.toUpperCase() +" / FUERA DE PLAZO"+"<br><br>" 
                +"🤦‍♂️ TITULAR: "+nombre
                + "<br>"+"☎️ TELF: "+fijo
                + "<br>"+"🔒 DNI: "+identificación
                + "<br>"+"🎫 CODIGO TICKET: "+peticion
                + "<br>"+"🗓 FECHA REG: "+reporte.fechaReg
                + "<br>"+"📜 CONTRATA: "+reporte.contrato
                + "<br>"+"📞 CEL REF: "+referencia
                + "<br>"+"📡 TECNOLOGIA: "+reporte.tecnologia
                + "<br>"+"🗝 CONNID: "+connid
                + "<br>"+"📖 OBS: "+nota;
                modalBody.appendChild(parrafoLine);

            }
        });
    });
};

function verRegistro(btn, fila, datos) {
    const { tiempo, nombre, fijo, identificación, nota, peticion, referencia, reporte } = datos;

    var modalBody = document.getElementsByClassName("modal-body")[0].getElementsByClassName("container-fluid")[0];


    btn.addEventListener('click', function () {
        modalBody.innerHTML = "";

        registroEntrantes.forEach(function (valor, indice) {

            if (tiempo == valor.tiempo && nombre == valor.nombre) {

                for (const valor in datos) {

                    if(valor != "reporte" && valor != "escalar"){

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
    eliminarRegistro,
    escalarRegistro
};