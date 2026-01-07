let Usuario = {};

let opcion;

do {
    opcion= prompt(
        "CRUD DE USUARIO\n" +
        "1. Crear Usuario\n" +
        "2. Ver Usuarios\n" +
        "3. Actualizar Usuario\n" +
        "4. Eliminar Usuario\n" +
        "5. Salir\n" +
        "Elige una opción: "

    );

    switch (opcion) {
        case "1":
            crearUsuario();
            break;
        case "2":
            verUsuarios();
            break;
        case "3":
            actualizarUsuario();
            break;
        case "4":
            eliminarUsuario();
            break;
        case "5":
            alert("Saliendo del Sitema");
            break;
        default:
            alert("Opción Invalida");
    }
} while (opcion !== "5");

function crearUsuario() {
    
}