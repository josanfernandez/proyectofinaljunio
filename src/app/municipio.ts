// Clase Municipio
export class Municipio {

    // Atributos de la clase Provincia
    id: number;
    provincia: number;
    nombre: string;
    confirmados: number;
    recuperados: number;
    criticos: number;
    fallecidos: number;

    // Constructor de la clase Municipio
    constructor(
        id: number,
        provincia: number,
        nombre: string,
        confirmados: number,
        recuperados: number,
        criticos: number,
        fallecidos: number,
    ) {
        this.id = id;
        this.provincia = provincia;
        this.nombre = nombre;
        this.confirmados = confirmados;
        this.recuperados = recuperados;
        this.criticos = criticos;
        this.fallecidos = fallecidos;
    }

}