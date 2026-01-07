let DirectorioUsuarios ={};

let Nombre = prompt("Ingrese su nombre: ")
let Edad;

do {
    Edad = Number(prompt("Ingrese su edad: "));
} while(isNaN(Edad) || Edad <= 0);
let contraseña = prompt("Ingrese cual sera su contraseña")
alert(`Usuario creado correctamente: \nNombre: ${Nombre}\n Edad: ${Edad}\n Contraseña: ${contraseña}`)

DirectorioUsuarios[Nombre]= {
    Edad: Edad,
    contraseña: contraseña
};

let nombrelogin = prompt ("Ingrese su nombre de Usuario: ");
let contraseñalogin = prompt ("Ingrese su contraseña ");

if (
    DirectorioUsuarios[nombrelogin] &&
    DirectorioUsuarios[nombrelogin].contraseña === contraseñalogin
){
    alert(`Bienvenido ${nombrelogin}`);

} else {
    alert(`Nombre o contraseña incrrectos`);
}
