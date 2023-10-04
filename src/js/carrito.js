// Función para mostrar el contenido del carrito en el botón
function mostrarCarritoEnBoton() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const cantidadProductosSpan = document.getElementById("cantidad-productos");
    const totalCarritoSpan = document.getElementById("total-carrito");

    // Calcular el precio total
    const precioTotal = carrito.reduce((total, producto) => total + producto.precio, 0);
    cantidadProductosSpan.textContent = carrito.length;
    totalCarritoSpan.textContent = precioTotal.toFixed(2); // Mostrar el precio con dos decimales
}

// Ejecutar la función al cargar la página
window.addEventListener("load", mostrarCarritoEnBoton);