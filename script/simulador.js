let nombre = "";

while (!nombre) {
    nombre = prompt("Bienvenido, ¿Cuál es tu nombre?");

    if (nombre === null) {
        alert("Debes ingresar un nombre válido para continuar.");
    } else if (!isNaN(nombre)) {
        nombre = "";
        alert("Por favor, ingresa un nombre válido (no números).");
    } else {
        nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
    }
}

alert(`¡Hola, ${nombre}! Bienvenido a nuestro simulador de préstamos.`);


const montoTotal = document.querySelector('#montoTotal');
const montoSolicitado = document.querySelector('#montoSolicitado');
const plazo = document.querySelector('#plazo');
const formularioCotizacion = document.querySelector('#formularioCotizacion');

const resultado = document.querySelector('#resultado');
const resultadoTexto = document.querySelector('#resultadoTexto');
const resultadoInteres = document.querySelector('#resultadoInteres');
const interesAnual = document.querySelector('#interesAnual');
const btnSi = document.querySelector('#btnSi');
const btnNo = document.querySelector('#btnNo');

btnNo.addEventListener('click', () => {
    formularioCotizacion.reset();
    ultimoFormulario.classList.remove('disable');
});


const ultimoFormulario = document.querySelector('#ultimoFormulario');
const btnFormFin = document.querySelector('#btnFormFin');
const inputsFormularioFin = document.querySelectorAll('.simulador__formularioFin-form-input');
const documentType = document.querySelector('#documentType');
const error = document.querySelector('.error');
const formularioFin = document.querySelector('#formulario2');
const calculoArr = [];

function validarFormularioCotizacion() {
    return montoTotal.value && montoSolicitado.value && plazo.value;
}

function calcularPrestamo() {
    const montoTotalValor = parseFloat(montoTotal.value);
    const montoSolicitadoValor = parseFloat(montoSolicitado.value);
    const plazoValor = parseFloat(plazo.value);

    let interes = 0;

    if (montoSolicitadoValor > 0.5 * montoTotalValor) {
        interes = 6; // Si el monto a solicitar supera el 50% del valor total del inmueble, el interés es del 8%
    } else {
        interes = 4.5; // Si el monto a solicitar es menor, el interés es del 5%
    }

    const tasaInteresMensual = interes / 12 / 100; // Tasa de interés mensual
    const cuota = (montoSolicitadoValor * tasaInteresMensual) / (1 - Math.pow(1 + tasaInteresMensual, -plazoValor));
    const totalIntereses = (cuota * plazoValor - montoSolicitadoValor).toFixed(2);

    resultado.classList.remove('disable');
    resultadoTexto.innerHTML = `Cuota mensual: U$S ${cuota.toFixed(2)} <br> <br> Intereses totales: U$S ${totalIntereses}`;
    resultadoInteres.classList.remove('disable');
    interesAnual.textContent = interes;

    calculoArr.push({
        montoTotal: montoTotalValor,
        montoSolicitado: montoSolicitadoValor,
        plazo: plazoValor,
        cuota: cuota.toFixed(2),
        totalIntereses: totalIntereses,
        interes: interes
    });
}

function validarFormularioFinal() {
    const [nombre, apellido, email, tipoDocumento, ci, telefono] = inputsFormularioFin;
    const isCI = documentType.value === "CI";
    const isPasaporte = documentType.value === "Pasaporte";
    const isFormValid = nombre.value && apellido.value && email.value && tipoDocumento.value && ci.value && telefono.value;

    btnFormFin.classList.toggle('buttonDisable', !isFormValid);

    if (tipoDocumento.value && (isCI || isPasaporte)) {
        const validLength = isCI ? ci.value.length === 8 : (isPasaporte && ci.value.length === 10);
        error.classList.toggle('disable', validLength);
    } else {
        error.classList.remove('disable');
    }
    return isFormValid;
}

function enviarFormulario() {
    const [nombre, apellido, email, tipoDocumento, ci, telefono] = inputsFormularioFin;
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth();
    const año = fechaActual.getFullYear() + 1;
    const fechaVencimiento = `${dia}/${mes + 1}/${año}`;
    const calculo = calculoArr[0];

    const datos = {
        nombre: nombre.value,
        apellido: apellido.value,
        ci: ci.value,
        email: email.value,
        telefono: telefono.value,
        tipoDocumento: tipoDocumento.value,
        fechaActual: fechaActual,
        fechaVencimiento: fechaVencimiento,
        calculo: calculo
    };

    console.log(datos);

    formularioFin.reset();
    ultimoFormulario.classList.add('disable');
    resultado.classList.add('disable');
    btnFormFin.classList.add('buttonDisable');

    alert('¡Los datos aportados en el formulario fueron enviados correctamente!');
}

// Eventos
formularioCotizacion.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validarFormularioCotizacion()) {
        calcularPrestamo();
    }
});

formularioFin.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validarFormularioFinal()) {
        enviarFormulario();
    }
});

documentType.addEventListener('change', validarFormularioFinal);

ultimoFormulario.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validarFormularioFinal()) {
        enviarFormulario();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && validarFormularioFinal()) {
        enviarFormulario();
    }
});

inputsFormularioFin.forEach(input => {
    input.addEventListener('input', validarFormularioFinal);
});

formularioCotizacion.addEventListener('submit', (e) => {
    e.preventDefault();
    if (montoTotal.value && montoSolicitado.value && plazo.value) {
        calcularPrestamo();
    }
});