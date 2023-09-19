const dbProductos = [
    {
        id: 1,
        nombre: "Scott Rc Pro",
        precio: 9900,
        imagen: ("../assets/img/scott1.webp"),
        categoria: "Montaña"
    },
    {
        id: 2,
        nombre: "Scott Spark Rc 900",
        precio: 8900,
        imagen: ("../assets/img/scott2.webp"),
        categoria: "Montaña"
    },
    {
        id: 3,
        nombre: "Scott Scale 900 Rc",
        precio: 5290,
        imagen: ("../assets/img/scott3.webp"),
        categoria: "Montaña"
    },
    {
        id: 4,
        nombre: "Scott Aspect 950",
        precio: 939,
        imagen: ("../assets/img/scott4.webp"),
        categoria: "Montaña"
    },
    {
        id: 5,
        nombre: "Scott Contessa 60",
        precio: 769,
        imagen: ("../assets/img/scott5.webp"),
        categoria: "Montaña"
    },
    {
        id: 6,
        nombre: "Scott Addict Rc 15",
        precio: 9590,
        imagen: ("../assets/img/scott6.webp"),
        categoria: "Ruta"
    },
    {
        id: 7,
        nombre: "Scott Foil RC 30",
        precio: 6390,
        imagen: ("../assets/img/scott7.webp"),
        categoria: "Ruta"
    },
    {
        id: 8,
        nombre: "Scott Addict Rc 40",
        precio: 6190,
        imagen: ("../assets/img/scott8.webp"),
        categoria: "Ruta"
    },
    {
        id: 9,
        nombre: "Scott Addict 20",
        precio: 2969,
        imagen: ("../assets/img/scott9.webp"),
        categoria: "Ruta"
    },
    {
        id: 10,
        nombre: "Scott Speedster 30",
        precio: 1649,
        imagen: ("../assets/img/scott10.webp"),
        categoria: "Ruta"
    },
    {
        id: 11,
        nombre: "Trek Madone SLR 9 AXS Gen 7",
        precio: 17690,
        imagen: ("../assets/img/trek1.png"),
        categoria: "Ruta"
    },
    {
        id: 12,
        nombre: "Trek Émonda SL 7 Disc",
        precio: 7700,
        imagen: ("../assets/img/trek2.webp"),
        categoria: "Ruta"
    },
    {
        id: 13,
        nombre: "Trek Domane 5 Disc",
        precio: 2700,
        imagen: ("/src/assets/img/trek3.jpeg"),
        categoria: "Ruta"
    },
    {
        id: 14,
        nombre: "TREK RAIL 5 (Eléctrica)",
        precio: 7400,
        imagen: ("../assets/img/trek4.jpeg"),
        categoria: "Montaña"
    },
    {
        id: 15,
        nombre: "Trek Procaliber 9.5",
        precio: 3200,
        imagen: ("../assets/img/trek5.jpeg"),
        categoria: "Montaña"
    },
    {
        id: 16,
        nombre: "Trek X-Caliber 8",
        precio: 2140,
        imagen: ("../assets/img/trek6.jpeg"),
        categoria: "Montaña"
    },
    {
        id: 17,
        nombre: "TREK Verve 1",
        precio: 900,
        imagen: ("../assets/img/trek7.jpeg"),
        categoria: "Montaña"
    },
    {
        id: 18,
        nombre: "Oltre Rc Tour de France",
        precio: 19000,
        imagen: ("../assets/img/bianchi1.jpg"),
        categoria: "Ruta"
    },
    {
        id: 19,
        nombre: "Bianchi Aria E-Road",
        precio: 6590,
        imagen: ("../assets/img/bianchi2.jpg"),
        categoria: "Ruta"
    },
    {
        id: 20,
        nombre: "Bianchi Nirone 7 Alu Claris",
        precio: 1349,
        imagen: ("../assets/img/bianchi3.jpg"),
        categoria: "Ruta"
    },
    {
        id: 21,
        nombre: "Bianchi Methanol",
        precio: 7790,
        imagen: ("../assets/img/bianchi4.jpg"),
        categoria: "Montaña"
    },
    {
        id: 22,
        nombre: "Bianchi Nitron 9.4",
        precio: 2890,
        imagen: ("../assets/img/bianchi5.jpg"),
        categoria: "Montaña"
    },
    {
        id: 23,
        nombre: "Bianchi Duel / 29",
        precio: 849,
        imagen: ("../assets/img/bianchi6.jpg"),
        categoria: "Montaña"
    },
    {
        id: 24,
        nombre: "DIVERGE STR S-WORKS",
        precio: 15490,
        imagen: ("../assets/img/specialized1.jpg"),
        categoria: "Ruta"
    },
    {
        id: 25,
        nombre: "DIVERGE EXPERT CARBON",
        precio: 6536,
        imagen: ("../assets/img/specialized2.jpg"),
        categoria: "Ruta"
    },
    {
        id: 26,
        nombre: "Allez E5 Sport",
        precio: 1690,
        imagen: ("../assets/img/specialized3.jpg"),
        categoria: "Ruta"
    },
    {
        id: 27,
        nombre: "Allez E5 Flored",
        precio: 1290,
        imagen: ("../assets/img/specialized4.jpg"),
        categoria: "Ruta"
    },
    {
        id: 28,
        nombre: "S-WORKS EPIC WORLD CUP",
        precio: 15690,
        imagen: ("../assets/img/specialized5.jpg"),
        categoria: "Montaña"
    },
    {
        id: 29,
        nombre: "EPIC COMP BRA FLORED",
        precio: 4712,
        imagen: ("../assets/img/specialized6.jpg"),
        categoria: "Montaña"
    },
    {
        id: 30,
        nombre: "ROCKHOPPER SPORT",
        precio: 890,
        imagen: ("../assets/img/specialized7.jpg"),
        categoria: "Montaña"
    },
];

const carritoGuardado = localStorage.getItem("carrito");
const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

function crearTemplate() {
    const productosMontana = [];
    const productosRuta = [];

    dbProductos.forEach((producto) => {
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
}

crearTemplate();
renderizarCarrito();
actualizarBotonPagar();

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnAgregar")) {
        const id = parseInt(e.target.getAttribute("data-id"));
        const producto = dbProductos.find((p) => p.id === id);
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
        mostrarFormulario();
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
}

function mayus(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}