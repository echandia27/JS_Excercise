let Nombre = prompt("Ingrese el nombre: ");
let Edad;
do {
   Edad = Number(prompt("Ingrese la Edad: ")); 
} while (isNaN(Edad) || Edad <= 0);
let correo;
do {
    correo = prompt("Digite su correo: ");
}while (!correo.endsWith("@gmail.com"));
let Estado = confirm("La persona esta activa?")
alert(`Nombre: ${Nombre}\n Edad: ${Edad}\n correo: ${correo}\n Estado: ${Estado} `)