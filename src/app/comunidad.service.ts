import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Comunidad } from "./comunidad";

@Injectable({
  providedIn: "root"
})

// Creación y llamada de los métodos/servicios Listar, Crear y eliminar Comunidad

export class ComunidadService {


  // Url generada por heroku para nuestro servicio de comunidades
  private url = "https://restapicovid.herokuapp.com/comunidades";

  constructor(private http: HttpClient) { }

  // Listado de comunidades API
  getComunidadApi() {
    return this.http.get(this.url);
  }

  // Insertar de comunidades API
  insertarComunidad(doc: any) {
    return this.http.post(this.url, doc);
  }

  // Eliminar de comunidades API
  eliminarComunidad(comunidad: Comunidad) {
    const urlId = `${this.url}/${comunidad.id}`;
    return this.http.delete(urlId);
  }


}
