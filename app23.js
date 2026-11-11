
function soltarIcono(evt, tipo) {
    evt.preventDefault();
    // debemos quitar la clase qui también, ya que dragleave no se ejecuta 
    // cuando se suelta el icono
    evt.currentTarget.classList.remove('arrastrando');
    const id = evt.dataTransfer.getData('text/plain');
    const icono = document.getElementById(id);
    // como se pueden arrastrar otras cosas, comprobamos que haya traido un
    // id existente y tenga la clase icono
    if ( !icono && !icono.classList.contains('contenedor-icono')) {
        return;
    }
    if (icono.dataset.tipo === tipo) {
        // si el elemento existe en el DOM, append lo mueve
        evt.currentTarget.append(icono);
        aciertos++;
        document.getElementById('progreso').value = aciertos;
        document.getElementById('aciertos').textContent = aciertos;
        evt.currentTarget.classList.remove('icono-acertado');
        evt.currentTarget.offsetWidth;
        evt.currentTarget.classList.add('icono-acertado');
        if(aciertos === TOTAL_ICONOS) {
            confetti({size:3, fade:true});
        }
    } else {
        evt.currentTarget.classList.remove('icono-fallado');
        evt.currentTarget.offsetWidth;
        evt.currentTarget.classList.add('icono-fallado');
    }
}

// Funciones para hacer DRAG
const iconos = document.querySelectorAll('.contenedor-icono');
for (const i of iconos) {
    i.addEventListener('dragstart', evt => {
        evt.dataTransfer.setData('text/plain', i.id);
        evt.dataTransfer.effectAllowed = 'move';
    });
}
document.querySelector('.entrada').addEventListener('dragover', evt => {
    evt.preventDefault(); // para que deje soltar en este elemento
    evt.dataTransfer.dropEffect = 'move';
});
document.querySelector('.salida').addEventListener('dragover', evt => {
    evt.preventDefault(); // para que deje soltar en este elemento
    evt.dataTransfer.dropEffect = 'move';
});

// Funciones para hacer DROP
document.querySelector('.entrada').addEventListener('drop', evt => {
   soltarIcono(evt, 'e');
})
document.querySelector('.salida').addEventListener('drop', evt => {
   soltarIcono(evt, 's');
})

document.querySelector('.entrada').addEventListener('dragenter', evt => {
    evt.currentTarget.classList.add('arrastrando');  
});
document.querySelector('.entrada').addEventListener('dragleave', evt => {
    // dragleave se produce cuando sale del elemento o 
    // cuando entra en un hijo, pero solo queremos quitar 
    // la clase cuando sale del elemento
    // evt.relatedTarget contiene el elemento al que 
    // se ha entrado
    if(evt.currentTarget.contains(evt.relatedTarget) === false) {
        evt.currentTarget.classList.remove('arrastrando');
    }
});
document.querySelector('.salida').addEventListener('dragenter', evt => {
    
      evt.currentTarget.classList.add('arrastrando');  
    
});
document.querySelector('.salida').addEventListener('dragleave', evt => {
    // dragleave se produce cuando sale del elemento o 
    // cuando entra en un hijo, pero solo queremos quitar 
    // la clase cuando sale del elemento
    // evt.relatedTarget contiene el elemento al que 
    // se ha entrado
    if(evt.currentTarget.contains(evt.relatedTarget) === false) {
        evt.currentTarget.classList.remove('arrastrando');
    }
});

let aciertos = 0;
const TOTAL_ICONOS = 12