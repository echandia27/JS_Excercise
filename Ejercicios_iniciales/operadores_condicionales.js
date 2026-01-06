let Nombre = prompt("Ingrese su Nombre: ")
let Edad;
do {
    Edad = Number(prompt("Ingrese su Edad: "));
} while (isNaN(Edad) || Edad <= 0);
let activo = confirm("El Usuario esta activo?");

let esMayor = Edad >=18;
if (esMayor === true && activo === true) {
    alert(`${Nombre} es mayor de Edad y está activo`);
}
else if (esMayor === true && activo === false) {
    alert(`${Nombre} es mayor de Edad pero no está activo`);
}
else if (esMayor === false && activo === true) {
    alert(`${Nombre} No es mayor de Edad pero esta activo`);
}
else {
    alert(`${Nombre} No es ni mayor de Edad ni está activo`);
}