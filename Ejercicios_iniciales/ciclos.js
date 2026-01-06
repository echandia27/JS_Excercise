const contraseñaCorrecta = "1234";

for (let intento = 1; intento <= 3; intento++) {
    let contraseña = prompt(`Intento ${intento}/3: Ingrese la contraseña`);

    if (contraseña=== contraseñaCorrecta) {
        alert("La contraseña es correcta, Bienvenido");
        break;
    } else {
        alert ("Contraseña Incorrecta.")
    }

    if (intento === 3) {
        alert("has agotado los intentos. Acceso Bloqueado")
    }
}