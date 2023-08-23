let carritoContent;
let restar;
let sumar;
let eliminar;

const contadorCarrito = () => {
    cantidadCarrito.style.display = "block";
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"))
}

const pintarCarrito = () => {

    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";

    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
    <h2 class="modal-header-title">Su compra</h2> `;
    modalContainer.append(modalHeader);
    const modalButton = document.createElement("h2");
    modalButton.innerText = "✖";
    modalButton.className = "modal-header-button";

    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    })

    modalHeader.append(modalButton);

    carrito.forEach((fruta) => {

        carritoContent = document.createElement("div")
        carritoContent.className = "modal-content"
        carritoContent.innerHTML = `
        <img src ="${fruta.img}">
        <h3>${fruta.nombre}</h3>
        <p>$ ${fruta.precio}</p>
        <span class="restar"> - </span>
        <p>${fruta.cantidad}</p>
        <span class="sumar"> + </span>
        <p>Total: $ ${fruta.cantidad * fruta.precio}</p> 
        <span class="delete-product"> ❌ </span> `;

        modalContainer.append(carritoContent)

        restar = carritoContent.querySelector(".restar");

        restar.addEventListener("click", () => {
            if (fruta.cantidad != 1) {
                fruta.cantidad--;
            }
            saveLocal();
            pintarCarrito();
        })
        sumar = carritoContent.querySelector(".sumar");
        sumar.addEventListener("click", () => {
            fruta.cantidad++;
            saveLocal();
            pintarCarrito();
        })

        eliminar = carritoContent.querySelector(".delete-product");
        eliminar.addEventListener("click", () => {
            eliminarFruta(fruta.id);
        })
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    const totalCompra = document.createElement("div")
    totalCompra.className = "total-content"
    totalCompra.innerHTML = `Total a pagar: $${total} `;
    modalContainer.append(totalCompra);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarFruta = (id) => {
    const foundID = carrito.find((Element) => Element.id == id);
    carrito = carrito.filter((carritoID) => {
        return carritoID != foundID;
    })
    contadorCarrito();
    saveLocal();
    pintarCarrito();
};
cantidadCarrito();
