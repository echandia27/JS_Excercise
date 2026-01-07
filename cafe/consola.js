//declaración de variables
let nombreCliente;
let producto;
let cantidad;
let precioUnitario;
let tipoConsumo;
let estadoPedido;

//Encabezado
alert("===SISTEMA DE GESTIÓN DE PEDIDOS - CAFÉBYTE===");

let opcion; // Declarar la variable opción aquí para que esté disponible en el bucle

while (opcion !== "5") {

    //Menú de opciones
    opcion = prompt(
        "Seleccione una opción:\n" +
        "1. Registrar un nuevo pedido\n" +
        "2. Consultar información del pedido\n" +
        "3. Calcular total a pagar\n" +
        "4. Actualizar estado del pedido\n" +
        "5. Salir");

    if (opcion === "1") {
        nombreCliente = prompt("Ingrese el nombre del cliente: ");
        producto = prompt("Ingrese el nombre del producto: ");
        cantidad = prompt("Ingrese la cantidad: ");
        if (isNaN(cantidad)|| cantidad<=0) {
            alert("Error: la cantidad debe ser un número valido.");
            continue;
        } else {
            cantidad = Number(cantidad);
        }
        precioUnitario = prompt("Ingrese el precio unitario: ");
        if (isNaN(precioUnitario)|| precioUnitario<=0) {
            alert("Error: el precio unitario debe ser un número. ");
            continue;
        } else {
            precioUnitario = Number(precioUnitario);
        }

        tipoConsumo = prompt("Ingrese el tipo de consumo (Para llevar / En el local): ");

        estadoPedido = "En preparación";

        alert("Pedido registrado correctamente. \nEstado: En prepación");
        console.log("Pedido registrado: ", nombreCliente, producto, cantidad, precioUnitario, tipoConsumo, estadoPedido);
        }
    else if (opcion === "2") {
        if (nombreCliente === undefined) {
            alert("No hay ningún pedido registrado. Por favor registre un pedido primero.");
        } else {
            alert(
                "INFORMACIÓN DEL PEDIDO\n" +
                "Cliente: " + nombreCliente + "\n" +
                "Producto: " + producto + "\n" +
                "Cantidad: " + cantidad + "\n" +
                "Precio Unitario: $" + precioUnitario + "\n" +
                "Tipo de Consumo: " + tipoConsumo + "\n" +
                "Estado del Pedido: " + estadoPedido
            );
        
            console.log("===INFORMACIÓN DEL PEDIDO===");
            console.log("Cliente: ", nombreCliente);
            console.log("Producto: ", producto);
            console.log("Cantidad: ", cantidad);
            console.log("Precio Unitario: ", precioUnitario);
            console.log("Tipo de Consumo: ", tipoConsumo);
            console.log("Estado del Pedido: ", estadoPedido);
        }
    }
    else if (opcion === "3") {
        if (nombreCliente === undefined) {
            alert("No hay ningún pedido registrado. Por favor registre un pedido primero.");
        } else {
            let total = cantidad * precioUnitario;

            alert("El total a pagar es: $" + total);
            console.log("Total a pagar: ", total);
        }

    }
    else if (opcion === "4") {
        if (nombreCliente === undefined) {
            alert("No hay ningún pedido registrado. Por favor registre un pedido primero.");
        } else {
            alert("El estado del pedido es: " + estadoPedido);

            let nuevoEstado =prompt("Ingrese el nuevo estado del pedido (En preparación /  Entregado): ");

            if (nuevoEstado === "En preparación" || nuevoEstado === "Entregado") {
                estadoPedido = nuevoEstado;
                alert("Estado del pedido actualizado correctamente. ");
                console.log("Nuevo estado del pedido :", estadoPedido);
            } else {
                alert("Estado no válido. Use 'En preparación' o 'Entregado'.");
            }
        }

    }
    else if (opcion === "5") {
        alert("Saliendo del sistema. ¡Gracias!");
        console.log("Usuario salió del sistema.");
    }
    else {
        alert("Opción no válida. Por favor seleccione una opción del 1 al 5.");
    }
}
