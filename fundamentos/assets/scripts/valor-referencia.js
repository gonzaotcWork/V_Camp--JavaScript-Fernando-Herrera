let persona1 = {
    nombre: "Juan",
    edad: 22,
    pareja: { nombre: 'Gertrudis', edad: 33, nacionalidad: 'peru', hijo: {nombre: 'Juancito JR'}},
    deporte: "salto con garrocha",
    nacionalidad: "Ponja",
};

let persona2 = { ...persona1, color: 'rojo' };
persona2.pareja.hijo.nombre = 'TOMASITO';
console.log({ persona1, persona2 });
