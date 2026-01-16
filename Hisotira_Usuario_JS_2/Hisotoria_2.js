//task 1
const productos = {
    1: { id: 1, nombre: "torta clasica", precio: 4500},
    2: { id: 2, nombre: "torta chocolate", precio: 5500},
    3: { id: 3, nombre: "torta tres leches", precio: 5000} 
};

//task 2

const numeros = new Set([10, 20, 30, 20, 10, 40]);
console.log("set sin duplicados:", numeros);

numeros.add(50);

console.log("existe el 30?", numeros.has(30));

numeros.delete(20);

for (let numero of numeros) {
    console.log("numero del set:", numero);
}

//task 3

const categorias = new Map();

categorias.set("tortas basicas", "torta clasica");
categorias.set("genovesas", "torta chocolate");
categorias.set("ponques", "torta tres leches");

//task 4

for (let id in productos) {
    console.log(
        `ID: ${id}, Nombre: ${productos[id].nombre}, precio: ${productos[id].precio}`
    );
}

for (let valor of numeros) {
    console.log("valor del set:", valor);
}

//task 5

function validarProducto (producto) {
    if (
        !producto.id ||
        typeof producto.nombre !== "string" ||
        typeof producto.precio !== "numer" ||
        producto.precio <= 0
    ) {
        return false;
    }
    return true;
}

 for (let id in productos) {
    const esValido = validarProducto(productos[id]);
    console.log(`producto ID ${id} valido:`, esValido);

 }

 console.log("lista completa de productos:", productos);
 console.log("lista de numeros unicos (Set):", numeros);
 console.log("categorias y productos (Map):", categorias);