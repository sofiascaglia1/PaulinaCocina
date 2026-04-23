document.addEventListener('DOMContentLoaded', () => {
    const riel = document.querySelector('.riel-tarjetas');
    const tarjetas = document.querySelectorAll('.tarjeta');
    const btnIzq = document.querySelector('.flecha.izquierda');
    const btnDer = document.querySelector('.flecha.derecha');

    let indice = 1; // La segunda tarjeta es la del medio

    function deslizar() {
        const anchoTarjeta = 320; // El min-width de tu CSS
        const gap = 40; // El gap de tu CSS
        
        // CÁLCULO PARA 3 TARJETAS:
        // Si indice es 1 (centro), el movimiento debe ser 0 para que esté centrada
        // porque el Flexbox ya la ubica ahí si el riel está en 0.
        // Pero como usamos flex-start, restamos la posición de la tarjeta.
        
        // Este cálculo centra la tarjeta 'indice' en el medio del contenedor:
        const desplazamiento = -((indice - 1) * (anchoTarjeta + gap));
        
        riel.style.transform = `translateX(${desplazamiento}px)`;

        // Aplicamos las clases para el tamaño
        tarjetas.forEach((t, i) => {
            if (i === indice) {
                t.classList.add('activa');
            } else {
                t.classList.remove('activa');
            }
        });
    }

    btnDer.addEventListener('click', () => {
        if (indice < tarjetas.length - 1) {
            indice++;
            deslizar();
        }
    });

    btnIzq.addEventListener('click', () => {
        if (indice > 0) {
            indice--;
            deslizar();
        }
    });

    // Ejecutamos al cargar
    deslizar();
});

const fechaEvento = new Date('2026-05-10T16:00:00').getTime();

const cuentaRegresiva = setInterval(() => {
    const ahora = new Date().getTime();
    const distancia = fechaEvento - ahora;

    // Cálculos de tiempo
    const d = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const h = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distancia % (1000 * 60)) / 1000);

    // Escribir en el HTML
    document.getElementById('dias').innerText = d;
    document.getElementById('horas').innerText = h;
    document.getElementById('min').innerText = m;
    document.getElementById('seg').innerText = s;

    // Si termina
    if (distancia < 0) {
        clearInterval(cuentaRegresiva);
        document.querySelector('.bloque-ajos').innerHTML = "<h3>¡YA EMPEZÓ EL EVENTO!</h3>";
    }
}, 1000);