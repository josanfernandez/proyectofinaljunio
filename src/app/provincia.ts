// Clase provincia
export class Provincia {

    // Atributos de la clase Provincia
    id: number;
    comunidad: number;
    nombre: string;
    habitantes: number;

    // Constructor de la clase Provincia
    constructor(
        id: number,
        comunidad: number,
        nombre: string,
        habitantes: number,
    ) {
        this.id = id;
        this.comunidad = comunidad;
        this.nombre = nombre;
        this.habitantes = habitantes;
    }

}