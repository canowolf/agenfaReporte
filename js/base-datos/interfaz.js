'use strict'
var llamadasEntrantes = [];
var ReqSolifueraPlazo = [];

/* Recuperar datos localStorage*/
const backupStorage = JSON.parse(localStorage.getItem('Llamadas registradas'));
for (var key in backupStorage) {
    if (backupStorage[key] != null || backupStorage != null) {
        llamadasEntrantes.push(backupStorage[key]);
    }
};
////////
function tiempo() {

    let tiempo = new Date();
    let hora = tiempo.getHours();
    let minutos = new Date().getMinutes();
    let segundos = new Date().getSeconds();

    if (hora < 10) { hora = "0" + hora }
    if (minutos < 10) { minutos = "0" + minutos }
    if (segundos < 10) { segundos = "0" + segundos }

    return hora + ":" + minutos + ":" + segundos;
}

function selectValue(element) {
    const elementSelected = document.getElementById(element);
    let key = elementSelected.selectedIndex;
    return elementSelected.querySelectorAll("option")[key].value;
}

function agregarLlamadaEntrante(nombreReg, titularCheck, nroConsultaReg, nroDniRucReg, notaCasoReg, nroReferencia, codReqSoliReg, nroAni, nroConnid, escalarCasoReg, reporte) {

    let llamadaEntrante = {
        tiempo: tiempo(),
        nombre: nombreReg,
        titular: titularCheck,
        fijo: nroConsultaReg,
        identificación: nroDniRucReg,
        nota: notaCasoReg,
        referencia: nroReferencia,
        peticion: codReqSoliReg,
        ani: nroAni,
        connid: nroConnid,
        escalar: escalarCasoReg,
        reporte: reporte[0]
    }

    llamadasEntrantes.push(llamadaEntrante);

    localStorage.setItem("Llamadas registradas", JSON.stringify(llamadasEntrantes));
}

function agregarFueraPlazo(tipoPendiente, fechaReg, tecnologia, contrato) {

    let fueraPlazo = {
        tipoPendiente: tipoPendiente,
        fechaReg: fechaReg,
        tecnologia: tecnologia,
        contrato: contrato
    }

    ReqSolifueraPlazo.push(fueraPlazo);
}

function guardarLlamada() {

    var invalidCampo = document.querySelectorAll(".form-control:invalid");

    if (invalidCampo.length == 0) {

        const nombreCall = document.getElementById("nombreCall").value;
        const titularCheck = document.getElementById("titularCheck").checked;
        const nroConsultaCall = document.getElementById("nroConsultaCall").value;
        const nroIdentificacionCall = document.getElementById("nroIdentificacionCall").value;
        const notaCasoCall = document.getElementById("notaCasoCall").value;
        const nroReferencia = document.getElementById("nroReferencia").value;
        const nroPeticion = document.getElementById("nroPeticion").value;
        const nroAni = document.getElementById("nroAni").value;
        const nroConnid = document.getElementById("nroConnid").value;
        const escalarCaso = document.getElementById("clienteFueraPlazo").checked;

        const fechaRegistro = document.getElementById("rqFechaRegistro").value;
        const tipoContrato = document.getElementById("tipo-contrato").value;

        if (escalarCaso == true) {

            agregarFueraPlazo(selectValue("tipo-pendiente"), fechaRegistro, selectValue("tipo-tecnologia"), tipoContrato);

            console.log(ReqSolifueraPlazo);
            
        }

        agregarLlamadaEntrante(nombreCall, titularCheck, nroConsultaCall, nroIdentificacionCall, notaCasoCall, nroReferencia, nroPeticion, nroAni, nroConnid, escalarCaso, ReqSolifueraPlazo);

        const btnLimpiar = document.getElementById('borrar-entrante');
        btnLimpiar.click()
        alert('Registrado con exito');
    }


}

export const interfaz = {
    agregarLlamadaEntrante,
    agregarFueraPlazo,
    guardarLlamada
};
