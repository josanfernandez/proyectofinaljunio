import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Provincia } from "./provincia";

@Injectable({
  providedIn: "root"
})

// Creación y llamada de los métodos/servicios Listar, Crear y eliminar Provincias
export class ProvinciaService {

  // Url generada por heroku para nuestro servicio de provincias
  private url = "https://restapicovid.herokuapp.com/provincias";

  constructor(private http: HttpClient) { }

  // Listado de provincias API
  getProvinciaApi() {
    return this.http.get(this.url);
  }

  // Insertar de provincias API
  insertarProvincia(doc: any) {
    return this.http.post(this.url, doc);
  }

  // Eliminar provincia desde API
  eliminarProvincia(provincia: Provincia) {
    const urlId = `${this.url}/${provincia.id}`;
    return this.http.delete(urlId);
  }

}
