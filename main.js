class producto {
    constructor(id, nombre, precio, img){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }

}

const pacha = new producto(1, "pacha", 1234, "img/pacha ad.jpg");
const chacal = new producto(2, "chacal", 3250, "img/chacal.png" );
const dogSelect = new producto(3, "Dog Selection", 4250, "img/dog select jr.png");
const pachaJr = new producto(4, "pacha cachoro", 3250, "img/pacha jr.jpg");
const pachaGato = new producto(5, "Pacha Gato", 2478, "img/Pacha-Gato.jpg");
const biopetAd = new producto(6, "Biopet Adulto", 5250, "img/biopet ad.jpg");
const biopetJr = new producto(7, "Biopet junior", 3250, "img/biopet jr.png" );
const companyAd = new producto(8, "Company adulto", 5290, "img/company ad.jpg");
const companyJr = new producto(9, "Company junior", 3250, "img/company jr.jpg");
const roscoCock = new producto(10, "rosco Cocktail", 2478, "img/rosco cock.png");

const productos = [pacha, chacal, dogSelect, pachaJr, pachaGato, biopetAd, biopetJr, companyAd, companyJr, roscoCock];

console.log(productos)

let carrito = [];

if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const contenedorProductos = document.getElementById("contenedorProductos");

const mostrarProductos = () => {
    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                        <div class ="card">
                            <img src = "${producto.img}" class = "card-img-top imgProductos" alt = "${producto.nombre}">
                            <div>
                              <h5> ${producto.nombre} <h5>
                              <p> ${producto.precio} </p>
                              <button class = "btn colorBoton" id="boton${producto.id}" > agregar al carrito </button>
                            </div>
                        </div> 
                        `
                        contenedorProductos.appendChild(card);

                        const boton = document.getElementById(`boton${producto.id}`);
                        boton.addEventListener("click", () => {
                            agregarAlCarrito(producto.id);
                        })
    })
}
 mostrarProductos();


const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if(productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else{
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
    }

    calcularTotal();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                        <div class ="card">
                            <img src = "${producto.img}" class = "card-img-top imgProductos" alt = "${producto.nombre}">
                            <div>
                              <h5> ${producto.nombre} <h5>
                              <p> ${producto.precio} </p>
                              <p> ${producto.cantidad} </p>
                              <button class = "btn colorBoton" id="eliminar${producto.id}" > Eliminar </button>
                            </div>
                        </div> 
                        `
        contenedorCarrito.appendChild(card);

        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })
    })
    calcularTotal();
}

const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    if(producto.cantidad === 1){
        carrito.splice(indice, 1);
    } else{
        producto.cantidad--
    }
    
    mostrarCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;

    })
    total.innerHTML = `total: $${totalCompra}`;
}

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    localStorage.clear();
}

const finalizarCompra = document.getElementById("finalizarCompra");

finalizarCompra.addEventListener("click", () => {
    const finishCompra = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      finishCompra.fire({
        title: 'Estas seguro de Finalizar Compra?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar!',
        cancelButtonText: 'cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          finishCompra.fire({
            title: 'Sus Productos Fueron Enviados Con Exitos!',
            icon: 'success',
            confirmButtonText: 'Aceptar!',
          }
          )
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          finishCompra.fire(
            'Has Cancelado',
            'Puede Seguir con Su compra :)',
            'error'
          )
        }
      })

})




