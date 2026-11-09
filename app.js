const iconos = document.querySelectorAll('.contenedor-icono');
for (const i of iconos) {
    i.addEventListener('dragstart', evt => {
        evt.dataTransfer.setData('text/plain', i.id);
        evt.dataTransfer.effectAllowed = 'move';
    });
}
document.querySelector('.entrada').addEventListener('dragover', evt => {
    evt.preventDefault(); // Para que deje soltar en este elemento
    evt.dataTransfer.dropEffect = 'move';
});

document.querySelector('.salida').addEventListener('dragover', evt => {
    evt.preventDefault(); // Para que deje soltar en este elemento
    evt.dataTransfer.dropEffect = 'move';
});

document.querySelector('.entrada').addEventListener('drop', evt => {
    evt.preventDefault();
    const id = evt.dataTransfer.getData("text/plain");
    const icono = document.getElementById(id);
    // Como se pueden arrastrar otras cosas, comprobamos que hay atraido un
    // id existente y que tenga la clase icono
    if(!icono || !icono.classList.contains('contenedor-icono')) {
        return;
    }
    if(icono.dataset.tipo === 'e') {
        // si el elemento existe en el DOM, append lo mueve
        evt.currentTarget.append(icono);
        aciertos++;
        document.getElementById('progreso').value = aciertos;
    }
});

document.querySelector('.salida').addEventListener('drop', evt => {
    evt.preventDefault();
    const id = evt.dataTransfer.getData("text/plain");
    const icono = document.getElementById(id);
    // Como se pueden arrastrar otras cosas, comprobamos que hay atraido un
    // id existente y que tenga la clase icono
    if(!icono || !icono.classList.contains('contenedor-icono')) {
        return;
    }
    if(icono.dataset.tipo === 's') {
        // si el elemento existe en el DOM, append lo mueve
        evt.currentTarget.append(icono);
        aciertos++;
        document.getElementById('progreso').value = aciertos;
    }
});

let aciertos = 0;