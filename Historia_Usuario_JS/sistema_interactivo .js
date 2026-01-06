let nombre = prompt("Ingrese el nombre: ");
let edad;

do {
    edad = Number(prompt("Cuantos años tienes: "));
} while (isNaN(edad) || edad <= 0);
if (edad >= 18){
    alert("Hola "+ nombre + " eres mayor de edad. ¡Prepárate para grandes oportunidades en el mundo de la programación!");
}
else {
    alert("Hola " + nombre +" eres menor de edad. ¡Sigue aprendiendo y disfrutando del código!");
}