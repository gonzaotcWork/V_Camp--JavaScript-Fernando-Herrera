
const elMayor = (a, b) => (a > b) ? a : b;

console.log(elMayor(33, 2))

const tieneMembresia = (miembro) => miembro ? '2 USD' : ' 5 USD';
console.log(tieneMembresia(true));

const amigo = true;
const amigosArr = [
    'Peter',
    'Tony',
    'Dr. Strange',
    amigo ? 'Thor' : 'Loki',
    (() => 'Nick Fury')(), //funcion anonima autoinvocada
    elMayor(15, 20),
]
console.log(amigosArr);

const nota = 55;
const grado = nota >= 95 ? 'A+' :
              nota >= 90 ? 'A' :
              nota >= 80 ? 'B+' :
              nota >= 70 ? 'C+' :
              nota >= 60 ? 'D+' : 'Desaprobado';
console.log(grado)

