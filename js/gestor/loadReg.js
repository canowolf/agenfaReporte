'use strict'

import { btnAcciones as accionRow } from "./acciones.js";

var listaBtn = [
    { class: "btn-success", class1: "fa-brands", class2: "fa-whatsapp", valor: "Whatsapp", id: "rowEscalar", dataToogle: "modal", dataTartget: "#modelId" },
    { class: "btn-primary", class1: "fa-solid", class2: "fa-eye", valor: "Ver", id: "rowVer", dataToogle: "modal", dataTartget: "#modelId" },
    { class: "btn-secondary", class1: "fa-solid", class2: "fa-pen-to-square" , valor: "Editar", id: "rowEditar" },
    { class: "btn-danger",class1: "fa-solid", class2: "fa-trash-can" , valor: "Eliminar", id: "rowEliminar" }
];

function agregarAcciones(btnList, escalar) {

    var divCont = document.createElement("div");

    ////////

    for (var i = 0; i <= btnList.length - 1; i++) {

        var btn = document.createElement("button");
        
        if(btnList[i].id != "rowEscalar"){

            //btn.innerText = btnList[i].valor;
            btn.type = "button";
            btn.classList.add("btn", btnList[i].class);
            btn.classList.add("btn", btnList[i].class1);
            btn.classList.add("btn", btnList[i].class2);
            btn.setAttribute("id", btnList[i].id);

        }else if(btnList[i].id == "rowEscalar" && escalar == true){

            //btn.innerText = btnList[i].valor;
            btn.type = "button";
            btn.classList.add("btn", btnList[i].class);
            btn.classList.add("btn", btnList[i].class1);
            btn.classList.add("btn", btnList[i].class2);
            btn.setAttribute("id", btnList[i].id);

        }

        if(btn.type == "button"){

            if (btnList[i].valor == "Ver" || btnList[i].id == "rowEscalar") {
                btn.setAttribute("data-toggle", btnList[i].dataToogle)
                btn.setAttribute("data-target", btnList[i].dataTartget)
            }

            divCont.appendChild(btn);
        }

    }

    /////
    divCont.classList.add("btn-group");
    divCont.setAttribute("role", "group");
    divCont.setAttribute("aria-label", "Basic example");

    return divCont;
}

//Obtener datos de localStorage

var registroEntrantes = JSON.parse(localStorage.getItem("Llamadas registradas"));
var tabla = document.querySelector("#tblRegLlamadas tbody");


function imprimirReg(registros) {
    registros.forEach(function (valor, indice) {
        let fila = tabla.insertRow(indice);

        let fecha = fila.insertCell(0);
        let nombre = fila.insertCell(1);
        if (valor.titular == true) {
            nombre.style.fontWeight = "bold";
            nombre.style.color = "grey";
        }

        let nroConsulta = fila.insertCell(2);
        let nroIdentificacion = fila.insertCell(3);
        let nota = fila.insertCell(4);
        let solicitud = fila.insertCell(5);
        let escalar = fila.insertCell(6);
        let accion = fila.insertCell(7);

        fecha.innerHTML = valor.tiempo;
        nombre.innerHTML = valor.nombre;
        nroConsulta.innerHTML = valor.fijo;
        nroIdentificacion.innerHTML = valor.identificación;

        if (valor.nota.length <= 12) {
            nota.innerText = valor.nota;
        } else {
            nota.innerText = valor.nota.slice(0, 15) + "...";
        }

        solicitud.innerHTML = valor.peticion;
        if (valor.escalar == true) {
            escalar.innerHTML = "si";
        } else {
            escalar.innerHTML = "no";
        }
        accion.appendChild(agregarAcciones(listaBtn, valor.escalar));

        var btnEscalar = accion.querySelector("#rowEscalar");
        if(btnEscalar != undefined){
            accionRow.escalarRegistro(btnEscalar, fila, registroEntrantes[indice]);
        }


        var btnEliminar = accion.querySelector("#rowEliminar");
        var btnVer = accion.querySelector("#rowVer");


        accionRow.verRegistro(btnVer, fila, registroEntrantes[indice]);
        accionRow.eliminarRegistro(btnEliminar, fila, registroEntrantes[indice])
    });
}


imprimirReg(registroEntrantes);

