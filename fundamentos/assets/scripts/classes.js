
class Persona {
    // Las clases siempre incluyen 'use strict'
    nombre = "";
    codigo = "";
    frase = "";
    comida = "";

    constructor(nombre = "Sin nombre", codigo = "Sin codigo", frase = "Sin frase") {
        // if (!nombre) throw Error('Necesitamos el nombre'); // Esto lo hace por que JS permite crear con parametros undefined.
        this.nombre = nombre;
        this.codigo = codigo;
        this.frase = frase;
    }

    // Los setters sirven para restringirle al usuario que cambie una propiedad de una determinada manera.
    // en el proto se puede ver que sets y gets se tienen.
    set setComidaFavorita(comida) { // Es buena practica que los sets reciban un único parametro, el que va a cambiar.
        // Es obligatorio que el nombre del set no sea el mismo que el de la propiedad. -> no podria ser "comida"
        this.comida = comida.toUpperCase();
    }
    
    get getComidaFavorita() { 
        return `La comida favorita de ${this.nombre} es ${this.comida}`
    }

    // ORDEN: 1ero Propiedades y métodos estaticos. 2do Propiedades de la clase. 3ero constructor. 4to Sets & Gets. 5to Metodos.

    quienSoy() {
        console.log(`soy ${this.nombre} y mi identidad es ${this.codigo}`);
    }
};

const Spiderman = new Persona('Peter Parker', 'soy tu amigo', 'Spiderman');
Spiderman.quienSoy();
Spiderman.setComidaFavorita = 'El pie de cereza de la tia May.';
Spiderman.nemesis = 'Duende verde';

console.log(Spiderman);