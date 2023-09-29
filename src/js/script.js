// Definición de una matriz vacía para almacenar productos
let productos = [];

// Recuperar el carrito de compras guardado en el LocalStorage o crear un nuevo carrito si no existe
const carritoGuardado = localStorage.getItem("carrito");
const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

// Variable para controlar el tiempo de cancelación de la compra
let cancelarCompraTimeout;

// Función para crear el template HTML de los productos
function crearTemplate() {
    // Arrays para almacenar productos de diferentes categorías
    const productosMontana = [];
    const productosRuta = [];

    // Verifica si la variable "productos" está definida y si es un array
    if (typeof productos !== "undefined" && Array.isArray(productos)) {
        //Iterar a través de los productos y construir el HTML para cada uno
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
            // Clasifica los productos en las categorías correspondientes
            if (categoria === "Montaña") {
                productosMontana.push(productoHTML);
            } else if (categoria === "Ruta") {
                productosRuta.push(productoHTML);
            }
        });
        // Obtener contenedores HTML para productos de montaña y ruta
        const productosMontanaContainer = document.querySelector(".productos-montaña");
        const productosRutaContainer = document.querySelector(".productos-ruta");
        // Rellenar los contenedores con productos clasificados
        productosMontanaContainer.innerHTML = productosMontana.join("");
        productosRutaContainer.innerHTML = productosRuta.join("");
    } else {
        console.error("La variable 'productos' no está definida o no es un array válido.");
    }
}

// Función para cargar productos desde un JSON
function cargarProductosDesdeJSON() {
    // Realizar una solicitud para obtener el archivo JSON de productos
    fetch("../js/productos.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al cargar el archivo JSON.");
            }
            return response.json();
        })
        .then((data) => {
            // Almacena los productos cargados en la variable 'productos' y crear el template
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

// Función para simular un proceso de compra
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
        cancelarCompraTimeout = () => {
            clearTimeout(timeout);
            cancelarSimulacion = true;
        };
    });
}

// Escuchar eventos de clic en la página
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnAgregar")) {
        // Si se hace clic en un botón "Añadir al Carrito", agregar el producto correspondiente
        const id = parseInt(e.target.getAttribute("data-id"));
        const producto = productos.find((p) => p.id === id);
        agregarAlCarrito(producto);
    } else if (e.target.classList.contains("btnEliminar")) {
        // Si se hace clic en un botón "Eliminar", eliminar el producto del carrito
        const id = parseInt(e.target.getAttribute("data-id"));
        eliminarDelCarrito(id);
    }
});

// Obtener el botón "Comprar" y agregar un evento de clic
const btnComprar = document.getElementById("btnComprar");

btnComprar.addEventListener("click", () => {
    if (carrito.length === 0) {
        // Mostrar un mensaje de error si el carrito está vacío
        Swal.fire({
            icon: 'error',
            title: 'Carrito Vacío',
            text: '¡Agrega productos al carrito para continuar!',
        });
    } else {
        // Simular un proceso de compra y mostrar el formulario de pago
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
        // Buscar si el producto ya existe en el carrito
        const productoBusqueda = carrito.find((p) => p.id === producto.id);
        if (productoBusqueda) {
            productoBusqueda.cantidad++;
        } else {
            // Si no existe, agregar el producto al carrito
            const nuevoProducto = {
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: 1
            };
            carrito.push(nuevoProducto);
        }
        // Actualiza el carrito en el Local Storage y en la página
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderizarCarrito();
        actualizarBotonPagar();
        console.log("Producto recibido:", producto);
    }
}

// Función para eliminar un producto del carrito
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

// Función para renderizar el contenido del carrito en la página
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

// Función para actualizar el botón "Pagar" en función del contenido del carrito
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

// Escuchar el evento para mostrar el formulario de pago
document.addEventListener("DOMContentLoaded", () => {
    const btnPagar = document.getElementById("btnPagar");
    if (btnPagar) {
        btnPagar.addEventListener("click", () => {
            mostrarFormulario();
        });
    }
});

// Función para cancelar la simulación de compra
function cancelarSimulacion() {
    clearTimeout(cancelarCompraTimeout);
    Swal.fire({
        icon: 'info',
        title: 'Compra cancelada',
        text: 'La compra se ha cancelado debido a la inactividad.',
    });
}

// Función para mostrar el formulario de pago
function mostrarFormulario() {
    // Eliminar el temporizador si existe
    if (cancelarCompraTimeout) {
        clearTimeout(cancelarCompraTimeout);
    }

    // Configurar un nuevo temporizador para cancelar la compra por inactividad
    cancelarCompraTimeout = setTimeout(() => {
        Swal.fire({
            icon: 'info',
            title: 'Compra cancelada',
            text: 'La compra se ha cancelado debido a la inactividad.',
        });
        cancelarSimulacion();
    }, 60000);

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

        // Verificar si se completaron todos los campos del formulario
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

        // Obtener los datos del comprador y productos comprados
        const nombreInput = document.getElementById("nombre");
        const apellidoInput = document.getElementById("apellido");
        const direccionInput = document.getElementById("direccion");
        const celularInput = document.getElementById("celular");
        const nombre = nombreInput.value.toUpperCase();
        const apellido = apellidoInput.value.toUpperCase();
        const email = document.getElementById("email").value;
        const direccion = direccionInput.value;
        const numeroTarjeta = document.getElementById("tarjeta").value;
        const fechaVencimiento = document.getElementById("vencimiento").value;
        const cvv = document.getElementById("cvv").value;

        // Mostrar los datos del comprador y reiniciar el carrito
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

        // Actualizar el carrito en la página y mostrar un mensaje de compra exitosa
        renderizarCarrito();
        actualizarBotonPagar();

        Swal.fire({
            icon: 'success',
            title: 'Compra exitosa',
            text: `Gracias por tu compra, ${nombre} ${apellido}!`,
        });
    });
}