import { formValid} from "./form-atencion.js";
import { interfaz as estrucura } from "./base-datos/interfaz.js";


function Redireccion(btn) {
    btn.addEventListener("click", function () {
        window.location.href = "./paginas/llamadas.html";
    });
}

function eventoClick(boton, accion) {
    boton.addEventListener('click', function () {
        accion();
    });
}

window.addEventListener('load', function () {

    formValid();

    var btnLlamadasAtendidas = document.getElementById("llamadasRegistradas");
    Redireccion(btnLlamadasAtendidas);

}, false);
