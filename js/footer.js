/* =========================================
   FOOTER.JS - Pie de página modular
   ========================================= */

document.addEventListener("DOMContentLoaded", function() {
    
    // Aquí defines tus enlaces reales UNA SOLA VEZ
    const links = {
        facebook: "https://www.facebook.com/profile.php?id=TU_ID_AQUI", // Pega aquí tu link de FB
        instagram: "https://www.instagram.com/gyulpetale_oficial",      // Pega aquí tu link de IG
        whatsapp: "https://wa.me/51901324647"                           // Tu número ya configurado
    };

    const footerHTML = `
    <footer>
        <div class="footer-content">
            <div class="footer-logo">
                <h4>Gyulpetale</h4>
                <p>Detalles que florecen para siempre.</p>
                <p style="font-size: 0.8rem; margin-top: 10px; color: #aaa;">
                    &copy; 2024 Gyulpetale. Todos los derechos reservados.
                </p>
            </div>
            
            <div class="footer-links-extra">
                <a href="nosotros.html" style="color:#ccc; text-decoration:none; margin:0 5px;">Nosotros</a> |
                <a href="contacto.html" style="color:#ccc; text-decoration:none; margin:0 5px;">Ubicación</a> |
                <a href="terminos.html" style="color:#ccc; text-decoration:none; margin:0 5px;">Términos</a> |
                <a href="politicas.html" style="color:#ccc; text-decoration:none; margin:0 5px;">Aviso Legal</a>
                </div>

            <div class="sociales">
                <a href="${links.facebook}" target="_blank" title="Síguenos en Facebook">
                    <i class="fab fa-facebook"></i>
                </a>
                <a href="${links.instagram}" target="_blank" title="Síguenos en Instagram">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="${links.whatsapp}" target="_blank" title="Escríbenos por WhatsApp">
                    <i class="fab fa-whatsapp"></i>
                </a>
            </div>
        </div>
       
    `;  

    // Insertamos el footer al final del cuerpo de la página
    document.body.insertAdjacentHTML('beforeend', footerHTML);
});