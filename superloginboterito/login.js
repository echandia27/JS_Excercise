const usuario = document.getElementById("user") ; 
const pasword = document.getElementById("pasw") ; 
const form = document.getElementById("formLog") ; 
const body = document.getElementById("body") ; 

function login(e) {
   e.preventDefault();
    const u = usuario.value; 
    const p = pasword.value; 
   if(u  === "pablo" && p === "a") {
        inicio(); 
        return  
   } 

   alert("usuario no encontrado"+ usuario + pasword)
}

function inicio() {
    body.innerHTML = `
    <h1>Hola</h1>
    `
}

form.addEventListener("submit", login )