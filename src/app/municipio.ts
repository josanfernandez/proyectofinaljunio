export class Municipio {
    id: number;
    provincia: number;
    nombre: string;
    confirmados: number;
    recuperados: number;
    criticos: number;
    fallecidos: number;

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