//Compra de Alfajores

const PrecioMinimo = 15;

function mayuscula(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function inicio() {
    let nombre;
    while (!nombre || !isNaN(nombre)) {
        nombre = prompt("Hola, ¿cuál es tu nombre?");
        if (nombre === null) {
            return;
        }
        if (!nombre || !isNaN(nombre)) {
            alert("Por favor, ingresa un nombre válido.");
        }
    }

    nombre = mayuscula(nombre);

    let dinero;
    while (isNaN(dinero)) {
        dinero = parseFloat(prompt(`${nombre}, ¿cuánto dinero tienes?`));
        if (dinero === null) {
            return;
        }
        if (isNaN(dinero)) {
            alert("Por favor, ingresa una cantidad válida de dinero.");
        }
    }

    if (dinero < PrecioMinimo) {
        alert(`Lo siento ${nombre}, no tienes suficiente dinero para comprar ningún alfajor`);
        console.log(`Lo siento ${nombre}, no tienes suficiente dinero para comprar ningún alfajor`);
        document.write(`Lo siento ${nombre}, no tienes suficiente dinero para comprar ningún alfajor`)
        return;
    }

    comprarAlfajor(nombre, dinero);
}

inicio();

function comprarAlfajor(nombre, dinero) {
    let opciones = {
        simple: 15,
        doble: 24,
        triple: 38,
        supremo: 65
    };

    while (true) {
        let opcionesTexto = "Elige el número de la opción que deseas comprar:\n";
        let i = 1;
        for (let opcion in opciones) {
            opcionesTexto += `${i}. Alfajor ${opcion} - Precio: $${opciones[opcion]}\n`;
            i++;
        }

        let opcionElegida = prompt(`${opcionesTexto}\nPara salir, ingresa 0.`);

        if (opcionElegida === null) {
            return;
        }

        opcionElegida = parseInt(opcionElegida);

        switch (opcionElegida) {
            case 0:
                alert(`Gracias por tu compra, ${nombre}!`);
                return;
            case 1:
            case 2:
            case 3:
            case 4:
                let opcion = Object.keys(opciones)[opcionElegida - 1];
                let precioOpcion = opciones[opcion];
                if (dinero >= precioOpcion) {
                    dinero -= precioOpcion;
                    let mensajeCompra = `Has comprado un alfajor ${opcion}. Te sobran $${dinero.toFixed(2)}`;
                    alert(mensajeCompra);
                    console.log(mensajeCompra);
                    document.write(mensajeCompra + "<br>");
                } else {
                    let mensajeNoAlcanza = `Lo siento, ${nombre}, no te alcanza para comprar un alfajor ${opcion}`;
                    alert(mensajeNoAlcanza);
                    console.log(mensajeNoAlcanza);
                    document.write(mensajeNoAlcanza + "<br>");
                }
                break;
            default:
                alert("Opción inválida. Intenta nuevamente.");
                console.log("Opción inválida. Intenta nuevamente.");
                document.write("Opción inválida. Intenta nuevamente." + "<br>");
                break;
        }

        if (dinero < PrecioMinimo) {
            let continuar = confirm("No tienes suficiente dinero. Regresar en otro momento");
            if (!continuar) {
                alert(`Gracias por tu visita, ${nombre}!`);
                break;
            }
        }
    }
}