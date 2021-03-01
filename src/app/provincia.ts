export class Provincia {
    id: number;
    comunidad: number;
    nombre: string;
    habitantes: number;

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