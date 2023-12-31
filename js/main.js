const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const showAlert = document.getElementById("showAlert");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let content;
let comprar;
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const saveLocal = () =>{
localStorage.setItem("carrito",JSON.stringify (carrito));};

frutas.forEach((fruta) => {
content = document.createElement("div");
content.className = "card";
content.innerHTML = `
<img src="${fruta.img}">
<h3>${fruta.nombre}</h3>
<p class = "precio">$ ${fruta.precio} </p> `;

shopContent.append(content);

comprar = document.createElement("button");
comprar.innerText = "Comprar";
comprar.className = "comprar";
content.append(comprar);

comprar.addEventListener("click", () => {
    const repeat = carrito.some((repeatFruta) => repeatFruta.id === fruta.id);

    if (repeat) {
    carrito.map((producto) => {
        if (producto.id === fruta.id) {
            producto.cantidad++;
    }
     })
       }
        else {
            carrito.push
            ({
                id: fruta.id,
                img: fruta.img,
                nombre: fruta.nombre,
                precio: fruta.precio,
                cantidad: fruta.cantidad,
            });
        }
        contadorCarrito();
        saveLocal();
    });
});


