// Esta es tu lista maestra de productos.
// Puedes agregar cuantos quieras aquí.

const productos = [
    {
        id: 1,
        nombre: "Ramo de Rosas Satinadas",
        precio: 45.00,
        precioOriginal: 60.00,
        imagen: "img/img1.webp", // Cambia esto por "img/foto1.jpg"
        categoria: "satinada",
        esDestacado: true, // ¿Aparece en "Destacados"?
        esNuevo: false,    // ¿Aparece en "Nuevos"?
        descripcion: "Rosas hechas con cinta de satín de alta calidad."
    },
    {
        id: 2,
        nombre: "Tulipanes de Tejido",
        precio: 30.00,
        imagen: "https://via.placeholder.com/300/b5ead7/333?text=Tulipanes+Tejidos",
        categoria: "tejido",
        esDestacado: true,
        esNuevo: false,
        descripcion: "Tejidos a mano con hilo de algodón."
    },
    {
        id: 3,
        nombre: "Girasol de Limpiapipa",
        precio: 15.00,
        imagen: "https://via.placeholder.com/300/ffffb2/333?text=Girasol",
        categoria: "limpiapipa",
        esDestacado: false,
        esNuevo: true, // Este aparecerá en la sección de nuevos
        descripcion: "Un detalle vibrante y duradero."
    },
    {
        id: 4,
        nombre: "Orquídea Eco-Friendly",
        precio: 55.00,
        imagen: "https://via.placeholder.com/300/e2f0cb/333?text=Orquidea",
        categoria: "eco",
        esDestacado: true,
        esNuevo: true,
        descripcion: "Materiales 100% reciclados."
    }
    // ¡Copia y pega un bloque {} y cambia los datos para agregar más!
];