let productos = [];

const carritoGuardado = localStorage.getItem("carrito");
const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

function crearTemplate() {
    const productosMontana = [];
    const productosRuta = [];

    // Verifica que la variable "productos" esté definida y tenga datos válidos
    if (typeof productos !== "undefined" && Array.isArray(productos)) {
        productos.forEach((producto) => {
            const { id, nombre, precio, imagen, categoria } = producto;

            const productoHTML = `
                <div class="producto">
                    <img class="producto-imagen" src="${imagen}" alt="${nombre}" />
                    <h2>${nombre}</h2>
                    <p>Precio: U$S ${precio}</p>
                    <button class="btnAgregar" data-id="${id}">Añadir al Carrito</button>
                </div>
            `;

            if (categoria === "Montaña") {
                productosMontana.push(productoHTML);
            } else if (categoria === "Ruta") {
                productosRuta.push(productoHTML);
            }
        });

        const productosMontanaContainer = document.querySelector(".productos-montaña");
        const productosRutaContainer = document.querySelector(".productos-ruta");

        productosMontanaContainer.innerHTML = productosMontana.join("");
        productosRutaContainer.innerHTML = productosRuta.join("");
    } else {
        console.error("La variable 'productos' no está definida o no es un array válido.");
    }
}

function cargarProductosDesdeJSON() {
    fetch("../js/productos.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al cargar el archivo JSON.");
            }
            return response.json();
        })
        .then((data) => {
            productos = data;
            crearTemplate();
        })
        .catch((error) => {
            console.error("Error al cargar el archivo JSON:", error);
        });
}

cargarProductosDesdeJSON();
crearTemplate();
renderizarCarrito();
actualizarBotonPagar();

let cancelarSimulacion = false;

function simularProceso() {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            if (cancelarSimulacion) {
                reject("Proceso cancelado");
            } else {
                const exito = Math.random() < 0.5;
                if (exito) {
                    resolve("Proceso completado con éxito");
                } else {
                    reject("Proceso fallido");
                }
            }
        }, 60000);
        cancelarSimulacion = () => {
            clearTimeout(timeout);
            cancelarSimulacion = true;
        };
    });
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnAgregar")) {
        const id = parseInt(e.target.getAttribute("data-id"));
        const producto = productos.find((p) => p.id === id);
        agregarAlCarrito(producto);
    } else if (e.target.classList.contains("btnEliminar")) {
        const id = parseInt(e.target.getAttribute("data-id"));
        eliminarDelCarrito(id);
    }
});

const btnComprar = document.getElementById("btnComprar");

btnComprar.addEventListener("click", () => {
    if (carrito.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Carrito Vacío',
            text: '¡Agrega productos al carrito para continuar!',
        });
    } else {
        simularProceso()
            .then((resultado) => {
                console.log(resultado);
                mostrarFormulario();
            })
            .catch((error) => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al procesar tu compra. Por favor, intenta nuevamente más tarde.',
                });
            })
            .finally(() => {
                console.log("La compra se ha intentado procesar.");
            });
    }
});

function agregarAlCarrito(producto) {
    if (producto) {
        const productoBusqueda = carrito.find((p) => p.id === producto.id);
        if (productoBusqueda) {
            productoBusqueda.cantidad++;
        } else {
            const nuevoProducto = {
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: 1
            };
            carrito.push(nuevoProducto);
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderizarCarrito();
        actualizarBotonPagar();
        console.log("Producto recibido:", producto);
    }
}

function eliminarDelCarrito(id) {
    const index = carrito.findIndex((p) => p.id === id);
    if (index !== -1) {
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad--;
        } else {
            carrito.splice(index, 1);
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderizarCarrito();
        actualizarBotonPagar();
    }
}

function renderizarCarrito() {
    const carritoSelector = document.querySelector("#carrito-list");
    carritoSelector.innerHTML = "";
    let totalCarrito = 0;
    let cantidadProductos = 0;

    if (carrito.length > 0) {
        carrito.forEach((producto) => {
            const { id, nombre, precio, cantidad } = producto;
            carritoSelector.innerHTML += `
                <li class="producto-carrito">
                    ${nombre} - $${precio} - Cantidad: ${cantidad}
                    <button class="btnEliminar" data-id="${id}">Eliminar</button>
                </li>
            `;
            totalCarrito += precio * cantidad;
            cantidadProductos += cantidad;
        });
    } else {
        carritoSelector.innerHTML = "<p>Sin productos en el carrito</p>";
    }

    const totalCarritoElement = document.getElementById("total-carrito");
    const cantidadProductosElement = document.getElementById("cantidad-productos");

    totalCarritoElement.textContent = totalCarrito.toFixed(2);
    cantidadProductosElement.textContent = cantidadProductos;
}

function actualizarBotonPagar() {
    const btnContenedor = document.getElementById("btnContenedor");
    btnContenedor.innerHTML = "";

    if (carrito.length > 0) {
        btnContenedor.innerHTML = `
            <button id="btnPagar" class="btn btnAgregar">Pagar</button>
        `;
    }

    const btnPagar = document.getElementById("btnPagar");
    if (btnPagar) {
        btnPagar.addEventListener("click", () => {
            mostrarFormulario();
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const btnPagar = document.getElementById("btnPagar");
    if (btnPagar) {
        btnPagar.addEventListener("click", () => {
            mostrarFormulario();
        });
    }
});

let cancelarCompraTimeout;

function mostrarFormulario() {
    Swal.fire({
        title: 'Completa tus datos para realizar la compra',
        html: `
            <form id="checkoutForm">
                <div class="form-group">
                    <label for="nombre"></label>
                    <input type="text" class="form-control" id="nombre" placeholder="Nombre" required>
                </div>
                <div class="form-group">
                    <label for="apellido"></label>
                    <input type="text" class="form-control" id="apellido" placeholder="Apellido" required>
                </div>
                <div class="form-group">
                    <label for="email"></label>
                    <input type="email" class="form-control" id="email" placeholder="Email" required>
                </div>
                <div class="form-group">
                    <label for="direccion"></label>
                    <textarea class="form-control" id="direccion" placeholder="Dirección de Envío" required></textarea>
                </div>
                <div class="form-group">
                    <label for="Celular"></label>
                    <input type="text" class="form-control" id="celular" placeholder="Celular" required>
                </div>
                <div class="form-group">
                    <label for="tarjeta"></label>
                    <input type="text" class="form-control" id="tarjeta" placeholder="Número de Tarjeta" required>
                </div>
                <div class="form-group">
                    <label for="vencimiento"></label>
                    <input type="text" class="form-control" id="vencimiento" placeholder="MM/YY" required>
                </div>
                <div class="form-group">
                    <label for="cvv"></label>
                    <input type="text" class="form-control" id="cvv" placeholder="CVV" required>
                </div>
            </form>
        `,
        confirmButtonText: 'Pagar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        showConfirmButton: true,
    }).then((result) => {
        if (result.isDismissed) {
            cancelarSimulacion();
            return;
        }

        const campos = ["nombre", "apellido", "email", "direccion", "tarjeta", "vencimiento", "cvv"];
        let campoVacio = false;
        campos.forEach((campo) => {
            const valor = document.getElementById(campo).value;
            if (!valor) {
                campoVacio = true;
                return;
            }
        });

        if (campoVacio) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: '¡Debes completar todos los campos para continuar!',
            }).then(() => {
                mostrarFormulario();
            });
            return;
        }

        const nombreInput = document.getElementById("nombre");
        const apellidoInput = document.getElementById("apellido");
        const direccionInput = document.getElementById("direccion");
        const celularInput = document.getElementById("celular");
        const nombre = mayus(nombreInput.value);
        const apellido = mayus(apellidoInput.value);
        const email = document.getElementById("email").value;
        const direccion = direccionInput.value;
        const numeroTarjeta = document.getElementById("tarjeta").value;
        const fechaVencimiento = document.getElementById("vencimiento").value;
        const cvv = document.getElementById("cvv").value;

        console.log("Datos del comprador:");
        console.log(`Nombre: ${nombre}`);
        console.log(`Apellido: ${apellido}`);
        console.log(`Correo: ${email}`);
        console.log(`Dirección: ${direccion}`);
        console.log(`Celular: ${celularInput.value}`);
        console.log("Productos comprados:");
        carrito.forEach((producto) => {
            console.log(`- ${producto.nombre} - Cantidad: ${producto.cantidad}`);
        });

        carrito.length = 0;
        localStorage.setItem("carrito", JSON.stringify(carrito));

        renderizarCarrito();
        actualizarBotonPagar();

        Swal.fire({
            icon: 'success',
            title: 'Compra exitosa',
            text: `Gracias por tu compra, ${nombre} ${apellido}!`,
        });
    });

    cancelarCompraTimeout = setTimeout(() => {
        Swal.fire({
            icon: 'info',
            title: 'Compra cancelada',
            text: 'La compra se ha cancelado debido a la inactividad.',
        });
        cancelarSimulacion();
    }, 60000);
}

function mayus(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}
