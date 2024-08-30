let segundos = 0; // Tiempo acumulado en segundos
let intervalo; // Referencia al intervalo
let tiempoInicio; // Marca de tiempo cuando se reanuda

function actualizarCronometro() {
  segundos++;
  document.getElementById("timer").innerText = segundos + " segundos";
}

document.addEventListener("click", function () {
  if (!intervalo) {
    // Si el cronómetro está detenido, calculamos el tiempo restante
    tiempoInicio = performance.now();
    intervalo = setInterval(actualizarCronometro, 1000); // Actualiza cada segundo
  }
});

document.getElementById("detener").addEventListener("click", function () {
  if (intervalo) {
    clearInterval(intervalo);
    intervalo = null;
    // Guardar el tiempo transcurrido desde la última vez que se pausó
    const tiempoActual = performance.now();
    segundos += Math.floor((tiempoActual - tiempoInicio) / 1000); // Convertir milisegundos a segundos
  }
});

document.getElementById("reanudar").addEventListener("click", function () {
  if (!intervalo) {
    // Si el cronómetro está detenido y queremos reanudar
    tiempoInicio = performance.now();
    intervalo = setInterval(actualizarCronometro, 1000); // Actualiza cada segundo
  }
});
