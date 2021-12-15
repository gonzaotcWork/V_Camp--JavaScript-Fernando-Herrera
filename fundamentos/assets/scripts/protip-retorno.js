// function crearPersona(nombre, apellido) {
//     return { nombre: nombre, apellido: apellido };
// }

const crearPersona = (nombre, apellido) => ({ nombre, apellido });

const persona = crearPersona("Fernando", "Herrera");
console.log(persona);

function imprimeArgumentos() {
    console.log(arguments);
}

const imprimeArgumentos2 = (edad, ...args) => {
    // console.log({ edad, args });
    return args;
};

imprimeArgumentos(10, true, false, "fernando", "herrera");
const [casado, vivo, nombre, saludo] = imprimeArgumentos2(10, true, false, "fernando", "herrera");
console.log(casado);

const tony = {
    nombre: "Tony Stark",
    codeName: "Iron Man",
    vivo: false,
    edad: 40,
    trajes: ["Mark I", "Mark V", "Hulkbuster"],
};

// const imprimePropiedades = personaje => {
//     console.log("nombre", personaje.nombre);
//     console.log("codeName", personaje.codeName);
//     console.log("vivo", personaje.vivo);
//     console.log("edad", personaje.edad);
//     console.log("trajes", personaje.trajes);
// };

console.log('here we are')
const imprimePropiedades = ({ nombre, codeName, vivo, edad, trajes }) => { 
    const propertys = [nombre, codeName, vivo, edad, trajes];
    propertys.forEach(el => console.log(`${el}`, el));
}

imprimePropiedades(tony);
