//1. Productos
const productos = [
    {
        id: 1,
        nombre: "Pastel Chocolate",
        precio: 45,
        categoria: "Chocolate",
        imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
        descripcion: "Pastel de chocolate con cobertura especial y ganache. Perfecto para amantes del chocolate."
    },
    {
        id: 2,
        nombre: "Pastel de Cumpleaños",
        precio: 40,
        categoria: "Especial",
        imagen: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500",
        descripcion: "Pastel tricolor de fiestapara especialmentte para niños."
    },
    {
        id: 3,
        nombre: "Cheesecake Clásico",
        precio: 50,
        categoria: "Clásico",
        imagen: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500",
        descripcion: "Cheesecake cremoso de vainilla con base de galleta y mermelada de frutos rojos."
    },
    {
        id: 4,
        nombre: "Cupcake de Naranja",
        precio: 38,
        categoria: "Fruta",
        imagen: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500",
        descripcion: "Cupcake artesanales sabor naranja cubierto con gaseado de fresa."
    },
    {
        id: 5,
        nombre: "Torta de Bodas",
        precio: 180,
        categoria: "Especial",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx8AbrzUC5-XmkfWPMUkrGIq4N9yU1DlfSAE_ba-Un_6ZOQi6toL5b7zRJ&s=10",
        descripcion: "Torta elegante de tres pisos para ocasiones especiales. Decoración personalizada."
    },
    {
        id: 6,
        nombre: "Cupcakes Surtidos",
        precio: 30,
        categoria: "Especial",
        imagen: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=500",
        descripcion: "Caja de 6 cupcakes surtidos con diferentes decoraciones y sabores."
    },
    {
        id: 7,
        nombre: "Pastel de Vainilla",
        precio: 42,
        categoria: "Clásico",
        imagen:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_Y6iSdvVgFNURKjvNvFAtqxM6XwAzKLyJnRnuSdWKDS1wfxyiS_ka5CQ&s=10",
        descripcion: "Pastel de vainilla con crema de mantequilla y decoración de flores comestibles."
    },
    {
        id: 8,
        nombre: "Torta Red Velvet",
        precio: 55,
        categoria: "Chocolate",
        imagen: "https://i0.wp.com/www.pasionthermomix.co/wp-content/uploads/2022/10/0001005216LosMejoresPostresDelMundoEp007RedVelvetCake3.jpg?resize=768%2C432&ssl=1",
        descripcion: "Clásica torta Red Velvet con crema de queso. Color rojo intenso y sabor inconfundible."
    }
]

//2. Variables Gobales

let categotiaActual = "todos";
let busqueda ="";
let productoActual = null;

//3. Mostrar productos

function mostrar() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";
    
    let resultado = [...productos];
    
    // Filtrar por categoría
    if (categoriaActual !== "todos") {
        resultado = resultado.filter(p => p.categoria === categoriaActual);
    }
    
    // Filtrar por búsqueda
    if (busqueda.trim() !== "") {
        resultado = resultado.filter(p => 
            p.nombre.toLowerCase().includes(busqueda.toLowerCase())
        );
    }
    
    if (resultado.length === 0) {
        lista.innerHTML = `
            <div class="col-12 text-center">
                <p>No se encontraron productos.</p>
            </div>
        `;
        return;
    }
    
    resultado.forEach(p => {
        lista.innerHTML += `
        <div class="col-md-6 col-lg-4">
            <div class="card h-100">
                <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}" loading="lazy">
                <div class="card-body">
                    <h4>${p.nombre}</h4>
                    <p class="cat">${p.categoria}</p>
                    <p class="precio">S/ ${p.precio.toFixed(2)}</p>
                    <div class="acciones">
                        <button class="btn-detalle" onclick="verDetalle(${p.id})" aria-label="Ver detalle de ${p.nombre}">Ver detalle</button>
                        <button class="btn-agregar" onclick="agregar(${p.id})" aria-label="Agregar ${p.nombre} al carrito">Agregar</button>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
}

// 4. filtro y busqueda
function filtrar(cat, btn) {
    categoriaActual = cat;
    document.querySelectorAll(".btn-filtro").forEach(b => b.classList.remove("activo"));
    if (btn) btn.classList.add("activo");
    mostrar();
}

function buscar() {
    busqueda = document.getElementById("buscar").value;
    mostrar();
}

//5. Modal-Vista de detalle 
function verDetalle(id) {
    productoActual = productos.find(p => p.id === id);
    if (!productoActual) return;
    
    document.getElementById("m-img").src = productoActual.imagen;
    document.getElementById("m-img").alt = productoActual.nombre;
    document.getElementById("m-nombre").textContent = productoActual.nombre;
    document.getElementById("m-precio").textContent = "S/ " + productoActual.precio.toFixed(2);
    document.getElementById("m-descripcion").textContent = productoActual.descripcion;
    document.getElementById("modal").style.display = "block";
    document.body.style.overflow = "hidden";
}

function cerrarModal() {
    document.getElementById("modal").style.display = "none";
    document.body.style.overflow = "auto";
}

function agregarModal() {
    if (productoActual) {
        agregar(productoActual.id);
        cerrarModal();
    }
}

// Cerrar modal al hacer clic fuera
window.onclick = function(e) {
    const modal = document.getElementById("modal");
    if (e.target === modal) {
        cerrarModal();
    }
};




