document.addEventListener('DOMContentLoaded', () => {
    // --- 1. LÓGICA DEL CARRUSEL ---
    const riel = document.querySelector('.riel-tarjetas');
    const tarjetas = document.querySelectorAll('.tarjeta');
    const btnIzq = document.querySelector('.flecha.izquierda');
    const btnDer = document.querySelector('.flecha.derecha');

    let indice = 1; 

    function deslizar() {
        const tarjeta = tarjetas[0];
    const anchoTarjeta = tarjeta.offsetWidth;

    const estiloRiel = window.getComputedStyle(riel);
    const gap = parseInt(estiloRiel.gap) || 0;

    const desplazamiento = -((indice - 1) * (anchoTarjeta + gap));

    if (riel) {
        riel.style.transform = `translateX(${desplazamiento}px)`;
    }

    tarjetas.forEach((t, i) => {
        t.classList.toggle('activa', i === indice);
    });
    }

    if (btnDer) {
        btnDer.addEventListener('click', () => {
            if (indice < tarjetas.length - 1) {
                indice++;
                deslizar();
            }
        });
    }

    if (btnIzq) {
        btnIzq.addEventListener('click', () => {
            if (indice > 0) {
                indice--;
                deslizar();
            }
        });
    }

    deslizar();

    // --- 2. LÓGICA DEL FORMULARIO Y MODAL ---
    const formulario = document.querySelector('.formulario-final');
    const modal = document.getElementById('modalExito');
    const btnCerrar = document.getElementById('cerrarModal');
    const spanNombre = document.getElementById('userName');

    // Al tocar ENVIAR
    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const inputNombre = formulario.querySelector('input[placeholder="Nombre"]');
            const nombreUsuario = inputNombre ? inputNombre.value : "";
            
            if (spanNombre) {
                spanNombre.innerText = nombreUsuario.toUpperCase();
            }
            
            if (modal) {
                modal.style.display = 'flex';
            }
            formulario.reset();
        });
    }

    // Al tocar VOLVER AL INICIO (Dentro del modal)
    if (btnCerrar) {
        btnCerrar.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 1. Ocultamos el modal
            if (modal) {
                modal.style.display = 'none';
            }
            
            // 2. Volvemos al inicio suavemente
            window.scrollTo({
                top: 0,
            });
        });
    }
});

// --- 3. CUENTA REGRESIVA ---
const fechaEvento = new Date('2026-06-28T16:00:00').getTime();

const cuentaRegresiva = setInterval(() => {
    const ahora = new Date().getTime();
    const distancia = fechaEvento - ahora;

    const d = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const h = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distancia % (1000 * 60)) / 1000);

    const elDias = document.getElementById('dias');
    const elHoras = document.getElementById('horas');
    const elMin = document.getElementById('min');
    const elSeg = document.getElementById('seg');

    if (elDias) elDias.innerText = d;
    if (elHoras) elHoras.innerText = h;
    if (elMin) elMin.innerText = m;
    if (elSeg) elSeg.innerText = s;

    if (distancia < 0) {
        clearInterval(cuentaRegresiva);
        const bloqueAjos = document.querySelector('.bloque-ajos');
        if (bloqueAjos) {
            bloqueAjos.innerHTML = "<h3>¡YA EMPEZÓ EL EVENTO!</h3>";
        }
    }
}, 1000);