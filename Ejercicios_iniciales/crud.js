let usuarios = {};

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
   const nombre = prompt("Ingrese nombre de usuario: ")
   
   if (usuarios[nombre]) {
    alert("Usuario ya existe.");
    return;
   }

   let edad;
   do {
    edad= Number(prompt("Ingrese la edad: "));
   } while (isNaN(edad) || edad <= 0);

   const contraseña = prompt("Ingrese contraseña: ");

   usuarios[nombre] = {
    edad: edad,
    contraseña: contraseña
   };

   alert("Usuario creado.")
}

function verUsuarios() {
    let lista = "Usuarios registrados:\n\n";

    for (let usuario in usuarios) {
        lista += `${usuario} - Edad: ${usuarios[usuario].edad}\n`;
    }

    if (Object.keys(usuarios).length === 0) {
        alert("No hay usuarios registrados");
    } else {
        alert(lista);
    }
}

function actualizarUsuario() {
    const nombre =prompt("Ingrese usuario a actualizar: ");

    if (!usuarios[nombre]) {
        alert("Usuario no encontrado");
        return;
    }

    let nuevaEdad;
    do {
        nuevaEdad = Number(prompt("Ingrese nueva edad: "));
    } while (isNaN(nuevaEdad) || nuevaEdad <= 0);

    usuarios[nombre].edad = nuevaEdad;

    alert("Usuario actualizado.");
}

function eliminarUsuario() {
    const nombre = prompt("Ingrese usuario a eliminar:");

    if (!usuarios[nombre]){
        alert("Usuario no existe");
        return;
    }

    delete usuarios[nombre];
    alert("Usuario eliminado.")
}