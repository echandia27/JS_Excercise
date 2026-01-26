// ESPERA A QUE LA PÁGINA ESTÉ LISTA
document.addEventListener("DOMContentLoaded", () => {

     // 1. OBTENER DATOS DEL USUARIO
    const role = localStorage.getItem("role");

     // 2. CAPTURAR ELEMENTOS HTML (como "agarrar" objetos en la página)
    const dashboardTitle = document.querySelector("h1");
    const adminPanel = document.getElementById("adminPanel");
    const adminComments = document.getElementById("adminComments");
    const userReplies = document.getElementById("userReplies");
    const input = document.getElementById("commentInput");
    const sendBtn = document.getElementById("sendBtn");

    // 3. PERSONALIZAR LA PÁGINA SEGÚN EL ROL
    if (role === "admin") {
        dashboardTitle.textContent = "Dashboard - ADMIN";
        if (adminPanel) adminPanel.style.display = "block";
        if (adminComments) {
            adminComments.style.display = "block";
            renderAdminComments();
        }
    //Escuchar cambios en localStorage (para múltiples pestañas)
    window.addEventListener('storage', (event) => {
        if (event.key === 'comments') {
            renderAdminComments();
        } 
    });

    // Exponer función para actualización manual
    window.refreshAdminComments = renderAdminComments;

    } else if (role === "user") {
        dashboardTitle.textContent = "Dashboard - USER";
        if (userReplies) {
            userReplies.style.display = "block";
            renderUserReplies(); //con esto el usuario ve las respuestas
    } 

        if (input && sendBtn) {
            input.style.display = "block";
            sendBtn.style.display = "block";
        }
    }
// sanitize
    function sanitize(input) {
        return input.replace(/[<>]/g, "");
    }

    // SOLO SI ES USUARIO (NO admin)
    if (sendBtn && role === "user") {
        sendBtn.addEventListener("click", () => {
            const userText = input.value.trim();

            if (userText === "") {
                alert("No puedes enviar comentarios vacios.")
                return;
            }

            // 3. LEER COMENTARIOS EXISTENTES (o crear array vacío)
            const comments = JSON.parse(localStorage.getItem("comments")) || [];

            // 4. CREAR NUEVO COMENTARIO
            const nuevoComentario = {
                id: Date.now(),
                user: localStorage.getItem("username") || "Usuario",
                text: sanitize(userText),
                reply: "",
                visibleToUser: true,
                timestamp: new Date().toISOString(),
                repliedAt: null //fecha de respuesta
            };

            // 5. GUARDAR EN localStorage
            comments.push(nuevoComentario);
            localStorage.setItem("comments", JSON.stringify(comments));

            // 6. LIMPIAR EL INPUT
            input.value = "";
            alert("Comentario enviado al administrador");

            // Disparar evento manual para actualizar admin en la misma pestaña
         
            window.dispatchEvent(new StorageEvent('storage', {
                key: 'comments',
                newValue: JSON.stringify(comments)
            }));
        });
    } 
    // admin render
    function renderAdminComments() {
        if (!adminComments) {
            console.error("❌ Elemento adminComments no encontrado");
            return;
        }
        // 1. LEER COMENTARIOS
        const comments = JSON.parse(localStorage.getItem("comments")) || [];
        // 2. LIMPIAR Y PREPARAR CONTENEDOR
        adminComments.innerHTML = "<h3>Comentarios de usuarios</h3>";

        if (comments.length === 0) {
            adminComments.innerHTML += "<p> No hay comentarios pendientes. </p>";
            return;
        }
        // 3. FILTRAR: Solo comentarios sin respuesta
        const comentariosSinResponder = comments.filter(c => !c.replied || c.reply === "");

        if (comentariosSinResponder.length === 0) {
            adminComments.innerHTML += "<p> Todos los comentarios han sido respondidos. </p>";

            //mostrar historial de respuetas
            const comentariosRespondidos = comments.filter(c => c.replied && c.reply !== "");
            if (comentariosRespondidos.length > 0) {
                adminComments.innerHTML += "<h4> Historial de respuestas:</h4>";
                comentariosRespondidos.forEach(c => {
                    adminComments.innerHTML += `
                    <div style="border:1px solid #4CAF50; padding:10px; margin:5px; border-radius:5px;">
                        <p><strong>Tu respuesta:</strong> ${c.reply}</p>
                        <small>${new Date(c.repliedAt).toLocaleString()}</small>
                        </div>
                    `;
                });
            }
            return;
        }
        // 4. MOSTRAR CADA COMENTARIO
        comentariosSinResponder.forEach((c, index) => {
            const card = document.createElement("div");
            card.className = "comment-card";
            card.style.cssText = `
                border: 1px solid #ddd;
                padding: 15px;
                margin-bottom: 15px;
                border-radius: 8px;
                background: ${index % 2 === 0 ? '#f9f9f9' : '#fff'};
            `;
            const fecha = c.timestamp ? new Date(c.timestamp).toLocaleString() : 'Sin fecha';
            // 5. AGREGAR HTML A LA TARJETA
            card.innerHTML = `
            <div style="display: flex; justify-content: space-between;">
                    <div>
                        <p><strong>👤 ${c.user}</strong></p>
                        <p><small>🕒 ${fecha}</small></p>
                    </div>
                    <button class="deleteBtn" style="background: #ff4444; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
                        🗑️ Eliminar
                    </button>
                </div>
                <p style="margin: 10px 0; padding: 10px; background: #e8f4f8; border-radius: 4px;">
                    "${c.text}"
                </p>
                <textarea 
                    class="reply-textarea" 
                    placeholder="Escribe tu respuesta aquí..."
                    style="width: 100%; min-height: 80px; padding: 10px; border: 1px solid #ccc; border-radius: 4px; margin: 10px 0;"
                >${c.reply || ''}</textarea>
                <br>
                <button class="replyBtn" style="background: #4CAF50; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-weight: bold;">
                    📩 Enviar respuesta
                </button>
            `;
            // 6. AGREGAR EVENTO AL BOTÓN "RESPONDER"
            const replyBtn = card.querySelector(".replyBtn");
            const deleteBtn = card.querySelector(".deleteBtn");
            const textarea = card.querySelector("textarea");

            //admin responde
            replyBtn.onclick = () => {
                const respuesta = textarea.value.trim();

                if (respuesta === "") {
                    alert("la respuesta no puede estar vacia")
                    return;
                }

                //actualizar comentario de la respuesta
                const commentIndex = comments.findIndex(com => com.id === c.id);
                if (commentIndex !== -1) {
                    comments[commentIndex].reply = sanitize(respuesta);
                    comments[commentIndex].replied = true;
                    comments[commentIndex].repliedAt = new Date().toISOString();
                    comments[commentIndex].visibleToUser = true;

                    // ✅ Asegurar que el campo 'user' existe y es correcto
                    if (!comments[commentIndex].user) {
                        comments[commentIndex].user = c.user || "Usuario";
                    }


                    //guardar cambios
                    localStorage.setItem("comments", JSON.stringify(comments));

                    //actualizar interfaz
                    renderAdminComments();

                    //disparar evento para que el usuario vea la respuesta
                    window.dispatchEvent(new StorageEvent('storage', {
                        key: 'comments',
                        newValue: JSON.stringify(comments)
                    }));

                    alert(`Respuesta enviada a ${c.user}`);
                }
            };

    

            deleteBtn.onclick = () => {
                if (confirm("estas seguro de eliminar este comentario?")) {
                    const updatedComments = comments.filter(x => x.id !== c.id);
                    localStorage.setItem("comments", JSON.stringify(updatedComments));
                    renderAdminComments();
                }
            };

            adminComments.appendChild(card);
        });
    }
    
    //user ver resuestas y comentarios
    function renderUserReplies() {
        if (!userReplies) return;

        const comments = JSON.parse(localStorage.getItem("comments")) || [];
        const currentUser = localStorage.getItem("username") || "usuario";

        //filtrar comentarios de este usuario que tengan respuesta
        const userComments = comments.filter(c => {
            const isFromUser = c.user && c.user.trim().toLowerCase() === currentUser.trim().toLowerCase();
            const hasReply = c.reply && c.reply.trim() !== "";
            const isReplied = c.replied === true;
            
            console.log(`📌 Comentario ${c.id}:`, { 
                usuarioComentario: c.user, 
                usuarioActual: currentUser, 
                coincide: isFromUser, 
                tieneRespuesta: hasReply 
            });
            
            return isFromUser && hasReply && isReplied;
        });


        userReplies.innerHTML = "<h3>Tus comentarios y respuestas</h3>";

        if (userComments.length === 0) {
            userReplies.innerHTML += `
            <p>📭 Aún no tienes comentarios con respuesta.</p>
            <p>Envía un comentario y el administrador te responderá pronto.</p>
        `;
        return;
        }

        // Ordenar por fecha de respuesta (más recientes primero)
        userComments.sort((a, b) => {
            const dateA = a.repliedAt ? new Date(a.repliedAt) : new Date(0);
            const dateB = b.repliedAt ? new Date(b.repliedAt) : new Date(0);
            return dateB - dateA;
        });

        userComments.forEach((c, index) => {
            const replyDiv = document.createElement("div");
            replyDiv.style.cssText = `
                border: 1px solid #4CAF50;
                padding: 15px;
                margin: 15px 0;
                border-radius: 8px;
                background: ${index % 2 === 0 ? '#f0fff0' : '#e8f8e8'};
            `;

            const fechaComentario = c.timestamp ? new Date(c.timestamp).toLocaleString() : 'Fecha desconocida';
            const fechaRespuesta = c.repliedAt ? new Date(c.repliedAt).toLocaleString() : 'reciente';

            replyDiv.innerHTML = `
                <div style="display: flex; justify-content: space-between;">
                    <div>
                        <p><strong>📝 Tu comentario:</strong></p>
                        <p style="margin-left: 15px; font-style: italic;">"${c.text}"</p>
                        <p><small>🕒 Enviado: ${fechaComentario}</small></p>
                    </div>
                    <span style="background: #4CAF50; color: white; padding: 5px 10px; border-radius: 12px; font-size: 0.8em;">
                        ✅ Respondido
                    </span>
                </div>
                <div style="margin-top: 15px; border-top: 1px dashed #ccc; padding-top: 15px;">
                    <p><strong>👑 Respuesta del administrador:</strong></p>
                    <p style="margin-left: 15px; padding: 10px; background: white; border-radius: 5px; border-left: 4px solid #4CAF50;">
                        ${c.reply}
                    </p>
                    <p><small>🕒 Recibido: ${fechaRespuesta}</small></p>
                </div>
            `;

            userReplies.appendChild(replyDiv);
        });
    
    }
    
    //escuchar cambios en camontarios
    window.addEventListener('storage', (event) => {
        if (event.key === 'comments' && role === "user") {
            console.log("Respuestas actualizadas");
            renderUserReplies();
        }  
    });
    
    //inicializacion
    console.log("sistema configurado exitosamente");

    //renderizar  segunr rol
    if (role === "admin") {
        renderAdminComments();
    } else if (role === "user") {
        renderUserReplies();

        //verificar si hay respuestas nuevas
        const comments = JSON.parse(localStorage.getItem("comments")) || [];
        const currentUser = localStorage.getItem("username") || "Usuario";
        const nuevasRespuestas = comments.filter(c =>
            c.user === currentUser && c.replied && !c.vistoPorUsuario
        );

        if (nuevasRespuestas.length > 0 ) {
            alert(`Tienes ${nuevasRespuestas.length} nueva(s) respuesta(s) del administrador!`);
            //marcar como vistas
            nuevasRespuestas.forEach(c => c.vistoPorUsuario = true);
            localStorage.setItem("comments", JSON.stringify(comments));
        }
    }

});