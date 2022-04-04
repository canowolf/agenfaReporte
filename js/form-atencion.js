'use strict';

import { interfaz as estrucura } from "./base-datos/interfaz.js";


function formValid() {

    // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
    var forms = document.getElementsByClassName('needs-validation');

    // Bucle sobre ellas y evitar la presentación
    var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');

            estrucura.guardarLlamada();

        }, false);

    });

    const btnGuardar = document.getElementById('guardar-entrante');
    const btnLimpiar = document.getElementById('borrar-entrante');
    const formBtnGuardar = document.getElementById('guardar-form');

    var acordion = document.getElementById('accordianId');

    const formsCampo = document.querySelectorAll('[type="text"],[type="number"], textarea, [type="checkbox"], select, [type="date"]');


    //CLIENTE FUERA DE PLAZO
    var pendienteFueraPlazo = document.getElementById('clienteFueraPlazo');
    acordion.style.display = "none";

    const tipoPendiente = document.getElementById("tipo-pendiente");
    const tipoTecnologia = document.getElementById("tipo-tecnologia");
    const fechaRegistro = document.getElementById("rqFechaRegistro");
    const tipoContrato = document.getElementById("tipo-contrato");

    if (pendienteFueraPlazo !== null) {
        pendienteFueraPlazo.addEventListener('click', function () {
            if (pendienteFueraPlazo.checked == true) {
                acordion.style.display = "block";

                const tipoPendiente = document.getElementById("tipo-pendiente");
                const tipoTecnologia = document.getElementById("tipo-tecnologia");
                const fechaRegistro = document.getElementById("rqFechaRegistro");
                const tipoContrato = document.getElementById("tipo-contrato");

                fechaRegistro.required = true;
                tipoPendiente.required = true;
                tipoTecnologia.required = true;
                tipoContrato.required = true;


            } else if (pendienteFueraPlazo.checked == false) {
                acordion.style.display = "none";

                fechaRegistro.required = false;
                tipoPendiente.required = false;
                tipoTecnologia.required = false;
                tipoContrato.required = false;
            }
        });
    }

    btnGuardar.addEventListener('click', function () {

        formBtnGuardar.click();
    });

    btnLimpiar.addEventListener('click', function () {

        forms[0].classList.remove('was-validated');

        acordion.style.display = "none";

        for (var a = 0; a <= formsCampo.length; a++) {

            if (formsCampo[a] !== undefined) {

                if (typeof formsCampo[a].value == "string") {
                    formsCampo[a].value = "";

                }
                if (typeof formsCampo[a].checked == "boolean") {
                    formsCampo[a].checked = false;
                }
                if (typeof formsCampo[a].selectedIndex == "number") {
                    formsCampo[a].selectedIndex = "0";
                }

            }
        }
    });

}

export { formValid };