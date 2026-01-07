function validarEdad(Edad) {
    return Edad >= 18;
}

function validarAcceso(edadValida, contraseñaCorrecta) {
    return edadValida && contraseñaCorrecta;
}

function mostrarMensaje(tieneAcceso) {
    if (tieneAcceso) {
        return "Acceso concedido."
    } else {
        return "Acesso denegado."
    }
}

let edadUsuario = 20;
let contraseñaCorrecta = true;
let edadValida = validarEdad(edadUsuario);
let acceso = validarAcceso(edadValida, contraseñaCorrecta);
let mensaje = mostrarMensaje(acceso);

alert(mensaje);
