/* ==========================================================================
   CHATBOT.JS - Crea el HTML del chat y maneja su lógica
   ========================================================================== */

// 1. INYECTAR EL HTML AUTOMÁTICAMENTE
// Esto hace que no tengas que pegar el código HTML en cada página.
document.addEventListener("DOMContentLoaded", function() {
    
    const htmlDelChat = `
        <div class="chat-toggle" onclick="toggleChat()">
            <i class="fas fa-comment-dots"></i>
        </div>

        <div class="chat-window" id="chat-window">
            <div class="chat-header">
                <div class="chat-title">
                    <span>🌸 Asistente Gyulpetale</span>
                    <span class="status">En línea</span>
                </div>
                <button onclick="toggleChat()">&times;</button>
            </div>
            
            <div class="chat-body" id="chat-body">
                <div class="mensaje bot">
                    <p>¡Hola! 👋 Soy el asistente virtual de Gyulpetale. ¿En qué puedo ayudarte hoy?</p>
                </div>
            </div>

            <div class="chat-footer">
                <div class="opciones-chat">
                    <button onclick="responderBot('ubicacion')">📍 Ubicación</button>
                    <button onclick="responderBot('envios')">🚚 Envíos</button>
                    <button onclick="responderBot('pago')">💳 Formas de Pago</button>
                    <button onclick="responderBot('personalizado')">🎨 Pedido Personalizado</button>
                    <button onclick="responderBot('whatsapp')">📞 Hablar con un humano</button>
                </div>
            </div>
        </div>
    `;

    // Insertamos este HTML al final del <body> de la página
    document.body.insertAdjacentHTML('beforeend', htmlDelChat);
});


// 2. LÓGICA DEL BOT (ABRIR, CERRAR Y RESPONDER)

function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    if(chatWindow) chatWindow.classList.toggle('abierto');
}

function responderBot(opcion) {
    const chatBody = document.getElementById('chat-body');
    if(!chatBody) return;

    let respuesta = "";
    let textoUsuario = "";

    switch(opcion) {
        case 'ubicacion':
            textoUsuario = "📍 ¿Dónde están ubicados?";
            respuesta = "Estamos en el Centro de Lima, Perú. ¡Hacemos entregas a todo Lima Metropolitana!";
            break;
        case 'envios':
            textoUsuario = "🚚 Información de envíos";
            respuesta = "Realizamos envíos seguros a domicilio. El costo depende de tu distrito. Llega en 24-48 horas hábiles.";
            break;
        case 'pago':
            textoUsuario = "💳 ¿Cómo puedo pagar?";
            respuesta = "Aceptamos Tarjetas de Crédito/Débito y PayPal directamente en la web. También Yape/Plin coordinando por WhatsApp.";
            break;
        case 'personalizado':
            textoUsuario = "🎨 Quiero un diseño personalizado";
            respuesta = "¡Nos encanta crear cosas nuevas! Para pedidos personalizados, escríbenos al WhatsApp.";
            break;
        case 'whatsapp':
            textoUsuario = "📞 Quiero hablar con un humano";
            respuesta = "Claro, escríbenos aquí: <a href='https://wa.me/51901324647' target='_blank' style='color:#003087; font-weight:bold;'>Ir a WhatsApp</a>";
            break;
    }

    // Escribir mensaje del usuario
    chatBody.innerHTML += `<div class="mensaje usuario"><p>${textoUsuario}</p></div>`;

    // Responder con delay
    setTimeout(() => {
        chatBody.innerHTML += `<div class="mensaje bot"><p>${respuesta}</p></div>`;
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 500);
}